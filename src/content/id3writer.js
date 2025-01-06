class ID3Writer {
    static encoders = {
      string: (str) => new TextEncoder().encode(str),
      uint32: (num) => {
        const arr = new Uint8Array(4);
        arr[0] = (num >> 24) & 0xff;
        arr[1] = (num >> 16) & 0xff;
        arr[2] = (num >> 8) & 0xff;
        arr[3] = num & 0xff;
        return arr;
      }
    };
  
    static createTextFrame(id, text) {
      const encoded = this.encoders.string(text);
      const buffer = new Uint8Array(10 + 1 + encoded.length);
      
      buffer.set(this.encoders.string(id), 0);
      buffer.set(this.encoders.uint32(1 + encoded.length), 4);
      buffer.set([0, 0], 8);
      buffer[10] = 3;
      buffer.set(encoded, 11);
      
      return buffer;
    }
  
    static createAPICFrame(imageData) {
      const mimeType = this.encoders.string('image/jpeg\0');
      const description = this.encoders.string('\0');
      
      const frameSize = 1 + mimeType.length + 1 + description.length + imageData.byteLength;
      const buffer = new Uint8Array(10 + frameSize);
      
      buffer.set(this.encoders.string('APIC'), 0);
      buffer.set(this.encoders.uint32(frameSize), 4);
      buffer.set([0, 0], 8);
      
      let offset = 10;
      buffer[offset++] = 3;
      buffer.set(mimeType, offset);
      offset += mimeType.length;
      buffer[offset++] = 3;
      buffer.set(description, offset);
      offset += description.length;
      buffer.set(new Uint8Array(imageData), offset);
      
      return buffer;
    }
  
    static write(data, metadata, imageData = null) {
      const frames = [];
      
      if (metadata.title) frames.push(this.createTextFrame('TIT2', metadata.title));
      if (metadata.artist) frames.push(this.createTextFrame('TPE1', metadata.artist));
      if (metadata.album) frames.push(this.createTextFrame('TALB', metadata.album));
      if (metadata.year) frames.push(this.createTextFrame('TYER', metadata.year));
      if (imageData) frames.push(this.createAPICFrame(imageData));
      
      const totalFrameSize = frames.reduce((sum, frame) => sum + frame.length, 0);
      const tagSize = 10 + totalFrameSize;
      const finalBuffer = new Uint8Array(tagSize + data.byteLength);
      
      // ID3 header
      finalBuffer[0] = 0x49; // 'I'
      finalBuffer[1] = 0x44; // 'D'
      finalBuffer[2] = 0x33; // '3'
      finalBuffer[3] = 3;    // version 2.3
      finalBuffer[4] = 0;    // flags
  
      function encodeSynchsafe(size) {
        const bytes = new Uint8Array(4);
        bytes[0] = (size >> 21) & 0x7F;
        bytes[1] = (size >> 14) & 0x7F;
        bytes[2] = (size >> 7) & 0x7F;
        bytes[3] = size & 0x7F;
        return bytes;
      }
    
      const synchsafeSize = encodeSynchsafe(totalFrameSize);
      finalBuffer[6] = synchsafeSize[0];
      finalBuffer[7] = synchsafeSize[1];
      finalBuffer[8] = synchsafeSize[2];
      finalBuffer[9] = synchsafeSize[3];
      
      let offset = 10;
      frames.forEach(frame => {
        finalBuffer.set(frame, offset);
        offset += frame.length;
      });
      
      finalBuffer.set(new Uint8Array(data), tagSize);
      
      return finalBuffer.buffer;
    }
  }
  
  export { ID3Writer };
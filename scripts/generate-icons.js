const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(size, outputPath) {
  const width = size;
  const height = size;
  const colorDepth = 8;
  const colorType = 2; // RGB
  const compression = 0;
  const filter = 0;
  const interlace = 0;

  let rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(filter);
    for (let x = 0; x < width; x++) {
      const cx = x / width - 0.5;
      const cy = y / height - 0.5;
      const radius = Math.sqrt(cx * cx + cy * cy);
      
      if (radius > 0.42) {
        rawData.push(255, 255, 255);
      } else {
        rawData.push(37, 99, 235);
      }
    }
  }

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = colorDepth;
  ihdrData[9] = colorType;
  ihdrData[10] = compression;
  ihdrData[11] = filter;
  ihdrData[12] = interlace;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', zlib.deflateSync(Buffer.from(rawData)));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const png = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, png);
  console.log(`Created: ${outputPath}`);
}

function makeChunk(type, data) {
  const typeBuffer = Buffer.from(type, 'ascii');
  const lengthBuffer = Buffer.alloc(4);
  lengthBuffer.writeUInt32BE(data.length, 0);
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc >>> 0, 0);
  return Buffer.concat([lengthBuffer, typeBuffer, data, crcBuffer]);
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

sizes.forEach(({ name, size }) => {
  createPNG(size, path.join(__dirname, '..', 'public', name));
});

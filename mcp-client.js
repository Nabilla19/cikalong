const https = require('https');
const url = 'https://mcp.desacikalongpangandaran.id/sse';
const token = '247e0224f060e783803f1fc74d550ee29300545f066701692e97bdde568a9b8a';

https.get(url, { headers: { 'Authorization': `Bearer ${token}` } }, (res) => {
  let endpoint = '';
  res.on('data', (chunk) => {
    const text = chunk.toString();
    console.log("SSE Chunk:", text);
    if (text.includes('endpoint')) {
      // Very basic parsing
      const match = text.match(/endpoint\?sessionId=([^&]+)/);
      if(match) {
         console.log("Found session id:", match[1]);
         process.exit(0);
      }
    }
  });
});

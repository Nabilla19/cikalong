const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { SSEClientTransport } = require("@modelcontextprotocol/sdk/client/sse.js");

async function main() {
  const token = '247e0224f060e783803f1fc74d550ee29300545f066701692e97bdde568a9b8a';
  const transport = new SSEClientTransport(
    new URL("https://mcp.desacikalongpangandaran.id/"),
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  
  const client = new Client({ name: "antigravity", version: "1.0.0" }, { capabilities: {} });
  
  await client.connect(transport);
  
  const tools = await client.listTools();
  console.log("TOOLS:", JSON.stringify(tools, null, 2));
  
  // Clean up
  process.exit(0);
}

main().catch(console.error);

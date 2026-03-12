# MCP for OpenClaw Beginners + ElevenLabs TTS MCP Guide

**Question:** Explain MCP to OpenClaw beginners and build a TTS MCP using ElevenLabs API  
**Date:** 2026-02-23

---

## Part 1: Understanding MCP (Model Context Protocol)

### What is MCP?

MCP is a **standardized protocol** (created by Anthropic) that allows AI assistants to connect to external tools and data sources. Think of it as **"USB-C for AI"** — a universal plug that lets any AI talk to any tool.

```
┌─────────────┐         MCP Protocol         ┌─────────────┐
│   OpenClaw  │ <=========================> │  MCP Server │
│  (AI Agent) │    stdio / HTTP / SSE        │  (Your Tool)│
└─────────────┘                              └─────────────┘
```

### Key Concepts

| Term | What it means |
|------|---------------|
| **MCP Server** | A program that exposes tools/resources to AI (e.g., TTS, file access, APIs) |
| **MCP Client** | The AI system connecting to servers (OpenClaw is a client) |
| **Tools** | Functions the AI can call (like `speak(text)`) |
| **Resources** | Data the AI can read (like a list of voices) |
| **Transport** | How they communicate (stdio, SSE, HTTP) |

### Why MCP?

Before MCP, every AI tool had a custom integration. MCP standardizes this:
- ✅ Write once, use with any MCP-compatible AI
- ✅ Consistent tool definitions (JSON Schema)
- ✅ Secure, sandboxed execution
- ✅ Easy to share and distribute

---

## Part 2: How OpenClaw Connects to MCP

OpenClaw has **built-in MCP client support**. You configure MCP servers in your config file, and OpenClaw:

1. **Spawns** the MCP server process on startup
2. **Discovers** available tools via the MCP handshake
3. **Exposes** those tools to the AI during conversation
4. **Routes** tool calls to the appropriate server

### OpenClaw MCP Config Location

```
~/.config/openclaw/config.yaml    # Linux/Mac
%APPDATA%\openclaw\config.yaml    # Windows
```

### Example MCP Config in OpenClaw

```yaml
mcp:
  servers:
    elevenlabs-tts:
      command: node
      args: ["path/to/tts-server/dist/index.js"]
      env:
        ELEVENLABS_API_KEY: "${ELEVENLABS_API_KEY}"
```

---

## Part 3: Building an ElevenLabs TTS MCP Server

### Architecture

```
┌──────────┐      MCP/stdio      ┌──────────────┐      HTTPS      ┌─────────────┐
│ OpenClaw │ <=================> │ TTS MCP      │ <=============> │ ElevenLabs  │
│          │                     │ Server       │                 │ API         │
└──────────┘                     └──────────────┘                 └─────────────┘
```

### Prerequisites

- Node.js 18+ installed
- ElevenLabs API key (get from https://elevenlabs.io)
- OpenClaw installed

### Step 1: Create Project Structure

```bash
mkdir elevenlabs-tts-mcp
cd elevenlabs-tts-mcp
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node ts-node
npx tsc --init
```

### Step 3: Configure TypeScript

Edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

Update `package.json`:

```json
{
  "name": "elevenlabs-tts-mcp",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### Step 4: Create the MCP Server

Create `src/index.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

// ElevenLabs API configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

if (!ELEVENLABS_API_KEY) {
  console.error("Error: ELEVENLABS_API_KEY environment variable is required");
  process.exit(1);
}

// Create MCP server
const server = new McpServer({
  name: "elevenlabs-tts",
  version: "1.0.0",
});

// Define the "speak" tool
server.tool(
  "speak",
  "Convert text to speech using ElevenLabs",
  {
    text: z.string().describe("The text to convert to speech"),
    voice_id: z
      .string()
      .optional()
      .describe("ElevenLabs voice ID (default: Rachel)"),
    model_id: z
      .string()
      .optional()
      .describe("Model ID (default: eleven_multilingual_v2)"),
    output_format: z
      .enum(["mp3_44100_128", "mp3_22050_32", "pcm_16000"])
      .optional()
      .describe("Output audio format"),
  },
  async ({ text, voice_id, model_id, output_format }) => {
    const voiceId = voice_id || "21m00Tcm4TlvDq8ikWAM"; // Rachel
    const modelId = model_id || "eleven_multilingual_v2";
    const format = output_format || "mp3_44100_128";

    try {
      const response = await fetch(
        `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY!,
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text,
            model_id: modelId,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`ElevenLabs API error: ${response.status} - ${error}`);
      }

      // Save audio to temp file
      const audioBuffer = await response.arrayBuffer();
      const tempDir = os.tmpdir();
      const filename = `tts_${Date.now()}.mp3`;
      const filepath = path.join(tempDir, filename);

      fs.writeFileSync(filepath, Buffer.from(audioBuffer));

      return {
        content: [
          {
            type: "text",
            text: `Audio saved to: ${filepath}\nText spoken: "${text.slice(0, 50)}..."`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Define the "list_voices" tool
server.tool(
  "list_voices",
  "List available ElevenLabs voices",
  {},
  async () => {
    try {
      const response = await fetch(`${ELEVENLABS_API_URL}/voices`, {
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY!,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = (await response.json()) as {
        voices: Array<{
          voice_id: string;
          name: string;
          category: string;
        }>;
      };

      const voiceList = data.voices
        .map(
          (v: { voice_id: string; name: string; category: string }) =>
            `- ${v.name} (${v.voice_id}) [${v.category}]`
        )
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Available voices:\n${voiceList}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ElevenLabs TTS MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
```

### Step 5: Build the Server

```bash
npm run build
```

### Step 6: Test Standalone (Optional)

```bash
# Set your API key
export ELEVENLABS_API_KEY="your-key-here"  # Linux/Mac
set ELEVENLABS_API_KEY=your-key-here       # Windows CMD
$env:ELEVENLABS_API_KEY="your-key-here"    # PowerShell

# Run the server
npm start
```

### Step 7: Configure OpenClaw

Add to your OpenClaw config (`~/.config/openclaw/config.yaml` or Windows equivalent):

```yaml
mcp:
  servers:
    elevenlabs-tts:
      command: node
      args: ["C:/path/to/elevenlabs-tts-mcp/dist/index.js"]
      env:
        ELEVENLABS_API_KEY: "your-api-key-here"
```

Or use environment variable reference:

```yaml
mcp:
  servers:
    elevenlabs-tts:
      command: node
      args: ["C:/path/to/elevenlabs-tts-mcp/dist/index.js"]
      env:
        ELEVENLABS_API_KEY: "${ELEVENLABS_API_KEY}"
```

### Step 8: Restart OpenClaw

```bash
openclaw gateway restart
```

### Step 9: Test with OpenClaw

In your chat, you should now be able to use commands like:
- "List available voices"
- "Say 'Hello world' using the speak tool"

---

## Part 4: Full Project Structure

```
elevenlabs-tts-mcp/
├── package.json
├── tsconfig.json
├── src/
│   └── index.ts
└── dist/
    └── index.js (generated)
```

---

## Part 5: Extending the Server

### Add More Tools

You can add more tools to the server:

```typescript
// Add voice cloning
server.tool(
  "clone_voice",
  "Clone a voice from audio samples",
  {
    name: z.string(),
    audio_paths: z.array(z.string()),
  },
  async ({ name, audio_paths }) => {
    // Implementation...
  }
);

// Add speech-to-speech
server.tool(
  "voice_convert",
  "Convert audio to a different voice",
  {
    audio_path: z.string(),
    target_voice_id: z.string(),
  },
  async ({ audio_path, target_voice_id }) => {
    // Implementation...
  }
);
```

### Add Resources

Expose data that the AI can read:

```typescript
server.resource(
  "voices",
  "elevenlabs://voices",
  async () => {
    // Return cached voice list
    return {
      contents: [
        {
          uri: "elevenlabs://voices",
          mimeType: "application/json",
          text: JSON.stringify(cachedVoices),
        },
      ],
    };
  }
);
```

---

## Troubleshooting

### "Tool not found"
- Check OpenClaw config path is correct
- Ensure `npm run build` completed successfully
- Restart OpenClaw gateway

### "ELEVENLABS_API_KEY not set"
- Verify env var in config or system environment
- Check for typos in the key

### "Connection refused"
- MCP servers use stdio, not network ports
- Check OpenClaw logs: `openclaw logs -f`

### Debug Mode

Add logging to your server:

```typescript
console.error("Debug:", someVariable);  // stderr for debug
```

---

## Summary

1. **MCP** = Universal protocol for AI ↔ Tool communication
2. **OpenClaw** = MCP Client (connects to your servers)
3. **Your MCP Server** = Exposes tools (speak, list_voices)
4. **Config** = Tell OpenClaw how to launch your server
5. **Test** = Restart OpenClaw, call the tools

Now your OpenClaw agent can speak using ElevenLabs! 🎙️

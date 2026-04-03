import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";

/**
 * MOCK streaming endpoint: no LLM — fixed SSE events only (no DB).
 *
 * One SSE block: `event` + `data` lines, then blank line — matches
 * splitStream / splitPart in @agentscope-ai/chat (parts split on `\n\n`).
 */
function sse(event: string, payload: unknown): string {
  const data = typeof payload === "string" ? payload : JSON.stringify(payload);
  return `event: ${event}\ndata: ${data}\n\n`;
}

/**
 * AgentScope runtime stream protocol (see AgentScopeRuntimeResponseBuilder in
 * @agentscope-ai/chat): JSON lines delivered as SSE `data:` fields.
 */
function writeMockAssistantStream(res: Response, replyText: string): void {
  const runId = randomUUID();
  const msgId = randomUUID();

  res.write(
    sse("delta", {
      object: "response",
      id: runId,
      status: "in_progress",
      created_at: Date.now(),
      output: [],
    }),
  );

  res.write(
    sse("delta", {
      object: "message",
      id: msgId,
      role: "assistant",
      type: "message",
      status: "in_progress",
      content: [],
    }),
  );

  const words = replyText.split(/(\s+)/).filter((p) => p.length > 0);
  for (const w of words) {
    res.write(
      sse("delta", {
        object: "content",
        msg_id: msgId,
        type: "text",
        delta: true,
        text: w,
      }),
    );
  }

  res.write(
    sse("delta", {
      object: "message",
      id: msgId,
      role: "assistant",
      type: "message",
      status: "completed",
      content: [{ type: "text", text: replyText, delta: false }],
    }),
  );

  res.write(
    sse("delta", {
      object: "response",
      id: runId,
      status: "completed",
      created_at: Date.now(),
    }),
  );
}

function setSseHeaders(res: Response): void {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
}

/**
 * POST /api/console/chat
 * Body: { input, session_id, stream, reconnect?, ... }
 */
export async function postConsoleChatController(req: Request, res: Response): Promise<void> {
  const body = req.body as { reconnect?: boolean; input?: unknown[] };

  setSseHeaders(res);

  if (body.reconnect === true) {
    const runId = randomUUID();
    res.write(
      sse("delta", {
        object: "response",
        id: runId,
        status: "completed",
        created_at: Date.now(),
        output: [],
      }),
    );
    res.end();
    return;
  }

  const reply =
    "[mock] Console chat is working. Replace this stream with your LLM / agent pipeline.";

  writeMockAssistantStream(res, reply);
  res.end();
}

/** POST /api/console/chat/stop?chat_id=... */
export async function postConsoleChatStopController(_req: Request, res: Response): Promise<void> {
  res.status(204).end();
}

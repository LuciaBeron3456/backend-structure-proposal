/**
 * MOCK: in-memory workspace files + memory + system prompt list (no DB).
 * Matches what `frontend/src/api/modules/workspace.ts` calls under `/agent/*`.
 */
import { randomUUID } from "node:crypto";

export interface MdFileInfo {
  filename: string;
  path: string;
  size: number;
  created_time: string;
  modified_time: string;
}

function isoNow(): string {
  return new Date().toISOString();
}

function toFileInfo(filename: string, content: string): MdFileInfo {
  const size = Buffer.byteLength(content, "utf8");
  const t = isoNow();
  return {
    filename,
    path: `/mock/${filename}`,
    size,
    created_time: t,
    modified_time: t,
  };
}

const fileContents = new Map<string, string>([
  ["README.md", "# Mock workspace\n\nThis is mock data."],
]);

const memoryByDate = new Map<string, string>([
  ["2026-04-03", "# Daily memory (mock)\n\nHello."],
]);

let systemPromptFiles: string[] = ["prompt_a.md", "prompt_b.md"];

export const agentMockStore = {
  listFiles(): MdFileInfo[] {
    return Array.from(fileContents.entries()).map(([name, c]) =>
      toFileInfo(name, c),
    );
  },

  getFile(name: string): string | undefined {
    return fileContents.get(name);
  },

  setFile(name: string, content: string): void {
    fileContents.set(name, content);
  },

  listMemory(): MdFileInfo[] {
    return Array.from(memoryByDate.entries()).map(([date, content]) => {
      const filename = `${date}.md`;
      return toFileInfo(filename, content);
    });
  },

  getMemory(date: string): string | undefined {
    return memoryByDate.get(date);
  },

  setMemory(date: string, content: string): void {
    memoryByDate.set(date, content);
  },

  getSystemPromptFiles(): string[] {
    return [...systemPromptFiles];
  },

  setSystemPromptFiles(files: string[]): void {
    systemPromptFiles = [...files];
  },

  /** MOCK: echo user message for chat attachment preview URLs */
  storePreviewBlob(filename: string, buffer: Buffer): void {
    previewBlobs.set(filename, buffer);
  },

  getPreviewBlob(filename: string): Buffer | undefined {
    return previewBlobs.get(filename);
  },
};

const previewBlobs = new Map<string, Buffer>();

export function makePreviewFilename(original: string): string {
  return `${randomUUID()}-${original.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
}

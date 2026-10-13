import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
}

export async function* analyzeTextWithAIStream(
  prompt: string,
  systemInstruction: string
): AsyncGenerator<string> {
  const client = getClient();
  const response = await client.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction,
    },
  });

  for await (const chunk of response) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
}

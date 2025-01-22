import fs from 'fs';

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(filePath: string): Promise<string> {
  try {
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
      language: 'pt', 
    });

    return response.text;
  } catch (error) {
    console.error('Erro na transcrição:', error);
    throw error;
  }
}

export async function summarizeTranscript(transcript: string): Promise<string> {
  try {
    const systemMessage = `
      Você é um assistente especializado em extrair e resumir apenas as tarefas e impedimentos das dailies.
      Ignore qualquer conversa que não seja diretamente relacionada às tarefas do dia anterior, do dia atual ou impedimentos.
    `;

    const userMessage = `
      Texto da transcrição:
      """
      ${transcript}
      """

      Por favor, gere um resumo em bullet points, para cada participante, indicando:
      - O que fez no dia anterior
      - Se há algum impedimento
      - O que planeja fazer em seguida (se mencionado)

      Responda em português de forma clara e sucinta.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const summary = response.choices[0]?.message?.content ?? '';
    return summary.trim();
  } catch (error) {
    console.error('Erro ao gerar resumo com GPT:', error);
    throw error;
  }
}
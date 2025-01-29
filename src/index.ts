import { summarizeTranscript, transcribeAudio } from './openai.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const AUDIO_FORMAT = process.env.INPUT_AUDIO_FORMAT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CALLS_FOLDER = path.join(__dirname, '..', 'calls');
const RESUMES_FOLDER = path.join(__dirname, '..', 'resumes');

async function processFile(file: string): Promise<void> {
  const filePath = path.join(CALLS_FOLDER, file);
  console.log(`\nProcessando arquivo: ${filePath}\n`);

  const transcript = await transcribeAudio(filePath);

  const summary = await summarizeTranscript(transcript);

  const baseName = path.basename(file, `.${AUDIO_FORMAT}`);
  const outputFileName = `resume-${baseName}.txt`;
  const outputFilePath = path.join(RESUMES_FOLDER, outputFileName);

  fs.writeFileSync(outputFilePath, summary, "utf-8");
  console.log(`Resumo criado em: ${outputFilePath}`);
}

async function main() {
  try {
    if (fs.existsSync(CALLS_FOLDER)) {
      console.error(`Pasta "calls" não encontrada em: ${CALLS_FOLDER}`);
    } else {
      console.log("Criando pasta calls")
      fs.mkdirSync(CALLS_FOLDER, { recursive: true });
    }

    if (!fs.existsSync(RESUMES_FOLDER)) {
      fs.mkdirSync(RESUMES_FOLDER);
    }

    const files = fs.readdirSync(CALLS_FOLDER).filter((file) => file.endsWith(`.${AUDIO_FORMAT}`));

    if (files.length === 0) {
      console.log(`Nenhum arquivo .${AUDIO_FORMAT} encontrado na pasta "calls".`);
      return;
    }

    const promises: Promise<void>[] = [];

    for (const file of files) promises.push(processFile(file))

    await Promise.all(promises);

    console.log('\nProcessamento concluído.');
  } catch (error: any) {
    console.error('Ocorreu um erro:', error.message || error);
    process.exit(1);
  }
}


main().catch((err) => {
  console.error('Erro ao executar o script:', err);
  process.exit(1);
});

import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { fileURLToPath } from 'url';

ffmpeg.setFfmpegPath(ffmpegPath as string);

const videosUrl = new URL('../videos/', import.meta.url);
const audiosUrl = new URL('../calls/', import.meta.url);

const videosPath = fileURLToPath(videosUrl);
const audiosPath = fileURLToPath(audiosUrl);

export class VideoToMp3Converter {
public static async convertAllMovToMp3(): Promise<void> {
 try {
   if (!fs.existsSync(audiosPath)) {
     fs.mkdirSync(audiosPath, { recursive: true });
   }

   const files = fs.readdirSync(videosPath);
   const movFiles = files.filter(
     (file) => path.extname(file).toLowerCase() === '.mov'
   );

   if (movFiles.length === 0) {
     console.log('Nenhum arquivo .mov encontrado na pasta videos.');
     return;
   }

   const promises: Promise<void>[] = [];

   for (const file of movFiles) promises.push(this.convertSingleFile(file));

   await Promise.all(promises);

   console.log('Conversão concluída!');
 } catch (error) {
   console.error('Erro ao converter arquivos:', error);
 }
}

private static convertSingleFile(fileName: string): Promise<void> {
 return new Promise((resolve, reject) => {
   const inputPath = path.join(videosPath, fileName);
   const baseName = path.parse(fileName).name;
   const outputPath = path.join(audiosPath, `${baseName}.mp3`);

   console.log(`Iniciando conversão de "${fileName}" para "${baseName}.mp3"...`);

   ffmpeg(inputPath)
     .audioCodec('libmp3lame')
     .on('end', () => {
       console.log(`Arquivo "${fileName}" foi convertido com sucesso!`);
       resolve();
     })
     .on('error', (err) => {
       console.error(`Erro ao converter "${fileName}":`, err);
       reject(err);
     })
     .save(outputPath);
 });
}
}

async function main() {
   await VideoToMp3Converter.convertAllMovToMp3();
}

main();
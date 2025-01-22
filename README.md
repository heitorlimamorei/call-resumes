# Meeting Summarizer with AI

This Node.js application leverages **TypeScript**, **OpenAI's GPT-4**, and **Whisper** models to summarize meeting content. It supports audio and video inputs, providing automated summaries in a `.txt` format.

---

## Features
- **Audio Summarization**: Place audio files in the `calls` directory, and the application will generate summaries in the `resumes` folder upon running `npm start`.
- **Video-to-Audio Conversion**: Add video files to the `videos` directory and run `npm run start-video`. The system will:
  1. Convert the video to audio.
  2. Save the audio in the `audios` directory.
  3. Generate summaries in the `resumes` folder.

---

## Installation

### Prerequisites
- Ensure you have a **recent version of Node.js** installed (16+ recommended).
- Obtain an OpenAI API key.

### Steps
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables by creating a `.env` file in the root directory:
   ```env
   OPENAIAPIKEY=<your-openai-api-key>
   INPUTAUDIOFORMAT=<audio-file-extension> # e.g., mp3
   INPUTVIDEOFORMAT=<video-file-extension> # e.g., mp4
   ```

---

## Project Structure
```
.
├── calls/          # Directory for input audio files.
├── videos/         # Directory for input video files.
├── audios/         # Intermediate directory for audio extracted from videos.
├── resumes/        # Directory where summaries are saved.
├── src/            # Source code for the application.
│   ├── index.ts    # Entry point for the app.
│   ├── summarize.ts # Logic for generating summaries.
│   ├── videoToAudio.ts # Logic for video-to-audio conversion.
├── .env            # Environment variables file.
├── package.json    # Project configuration and dependencies.
└── README.md       # Documentation.
```

---

## Usage

### Audio Summarization
1. Add audio files to the `calls` directory.
2. Run the command:
   ```bash
   npm start
   ```
3. Summaries will appear as `.txt` files in the `resumes` folder.

### Video Summarization
1. Add video files to the `videos` directory.
2. Run the command:
   ```bash
   npm run start-video
   ```
3. The application will:
   - Convert video files to audio.
   - Place the audio files in the `audios` directory.
   - Generate summaries in the `resumes` folder.

---

## Environment Variables
| Variable          | Description                                      |
|-------------------|--------------------------------------------------|
| `OPENAIAPIKEY`    | Your OpenAI API key.                            |
| `INPUTAUDIOFORMAT`| File format for input audio (e.g., mp3, wav).    |
| `INPUTVIDEOFORMAT`| File format for input video (e.g., mp4, mov).    |

---

## Scripts
| Command              | Description                                   |
|----------------------|-----------------------------------------------|
| `npm start`          | Process audio files in the `calls` directory. |
| `npm run start-video`| Process video files in the `videos` directory.|

---

## Dependencies
- **Node.js**: Runtime environment.
- **TypeScript**: Typed JavaScript for enhanced development.
- **OpenAI API**: GPT-4 for text summarization and Whisper for audio transcription.
- **FFmpeg**: Required for video-to-audio conversion.

---

## Notes
- Ensure FFmpeg is installed and added to your system's PATH for video processing.
- The application supports only the file formats specified in the `.env` file.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.


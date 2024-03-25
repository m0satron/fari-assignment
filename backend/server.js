import fs from "fs";
import path from "path";
import OpenAI from "openai";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const outputPath = path.join(__dirname, 'output');
if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

app.use(express.json());
app.use(cors()); 
app.use('/audio', express.static(outputPath), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
} ); 

app.post('/chat', async (req, res) => {
  try {
    const messages = req.body.input;
    const response = await chat(messages);
    res.json({ success: true, response });
  } catch (error) {
    console.log({error})
    res.status(500).json({ success: false, message: error.message });
  }
});


app.post('/voice', async (req, res) => {
  try {
    const text = req.body.text;
    const filename = await voice(text);
    res.json({ success: true, audioPath: `/audio/${filename}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});


app.post('/random-facts', async (req, res) => {
  try {
    const messages = req.body.input;
    const response = await randomFacts(messages);
    res.json({ success: true, response });
  } catch (error) {
    console.log({error})
    res.status(500).json({ success: false, message: error.message });
  }
});


async function chat(messages = []) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-4-0125-preview",
  });
  return completion;
}

async function randomFacts(messages = []) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-4-0125-preview",
  });
  return completion;
}


async function voice(input) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
  const filename = `${uuidv4()}.mp3`;
  const speechFile = path.join(outputPath, filename);

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

  return filename;
}

app.listen(port, () => console.info(`Server listening at http://localhost:${port}`));
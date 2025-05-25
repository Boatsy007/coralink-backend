import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Setup OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Coralink route
app.post('/coralink', async (req, res) => {
  try {
    const { command, tradie_id } = req.body;

    console.log(`Command from ${tradie_id}:`, command);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are Cora, a voice-activated assistant built for tradies. You're helpful, casual, and speak like a mate on the job site. Keep replies short, practical, and clear. No fluff, no corporate talk.`
        },
        {
          role: 'user',
          content: command
        }
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log(`Reply to ${tradie_id}:`, reply);

    res.json({ reply });
  } catch (error) {
    console.error('Backend Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

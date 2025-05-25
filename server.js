require('dotenv').config();
const express = require('express');
const { OpenAIApi, Configuration } = require('openai');
const { createClient } = require('@supabase/supabase-js');

console.log("🔥 Coralink starting...");

const app = express();
app.use(express.json());

// ✅ Everything else goes here...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Coralink is live at http://localhost:${PORT}`);
});

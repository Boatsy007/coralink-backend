app.post('/coralink', async (req, res) => {
  try {
    const { command, tradie_id } = req.body;
    console.log(`Command from ${tradie_id}:`, command);

    // Step 1: Figure out the user's intent
    const intentResult = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You're an AI assistant that only replies with a single word: the action to take. Reply with one of: add_client, create_quote, send_invoice, schedule_job, send_message, add_note, unknown.`
        },
        {
          role: 'user',
          content: command
        }
      ]
    });

    const intent = intentResult.choices[0].message.content.trim().toLowerCase();
    console.log(`Intent: ${intent}`);

    // Step 2: Call the correct function (placeholder for now)
    let reply;
    switch (intent) {
      case 'add_client':
        reply = "Got it. I'll add the client.";
        break;
      case 'create_quote':
        reply = "No worries. I'll start the quote.";
        break;
      case 'send_invoice':
        reply = "Sending that invoice now.";
        break;
      case 'schedule_job':
        reply = "Alright, let’s book it in.";
        break;
      case 'send_message':
        reply = "Sure, I’ll send that message.";
        break;
      case 'add_note':
        reply = "Note added.";
        break;
      default:
        reply = "Sorry mate, I’m not sure what you mean.";
        break;
    }

    res.json({ reply });
  } catch (error) {
    console.error('🔥 Backend Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

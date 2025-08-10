const express = require('express');
const cors = require('cors');
const { runAgent } = require('./agent');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/debug', async (req, res) => {
    try {
    const { code, error, language } = req.body; // <-- CHANGE THIS LINE
    if (!code || !error || !language) {
      return res.status(400).json({ message: 'Code, error, and language are required.' });
    }
    const result = await runAgent({ code, error, language }); // <-- CHANGE THIS LINE
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.listen(3001, () => console.log('Backend server running on port 3001'));
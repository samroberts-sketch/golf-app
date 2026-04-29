const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/tournaments', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'tournaments.json');
    const raw = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error('Error reading tournaments.json:', err);
    res.status(500).json({ error: 'Could not load tournament data.' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`⛳ Golf Calendar running at http://localhost:${PORT}`);
});

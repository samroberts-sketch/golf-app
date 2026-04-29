const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure data directory and tournaments.json exist
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'tournaments.json');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

// Serve static files
app.use(express.static(__dirname));

// API: tournaments
app.get('/api/tournaments', (req, res) => {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error('Error reading tournaments.json:', err);
    res.status(500).json({ error: 'Could not load tournament data.' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('sendFile error:', err);
      res.status(500).send('Error: ' + err.message);
    }
  });
});

// Catch-all
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('sendFile error:', err);
      res.status(500).send('Error: ' + err.message);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Golf Calendar running at http://localhost:${PORT}`);
});

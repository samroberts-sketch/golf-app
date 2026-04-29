const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting server, PORT env:', process.env.PORT);

app.get('*', (req, res) => {
  console.log('REQUEST:', req.method, req.path);
  res.send('Golf Calendar OK - PORT=' + PORT + ' PATH=' + req.path);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Listening on 0.0.0.0:' + PORT);
});

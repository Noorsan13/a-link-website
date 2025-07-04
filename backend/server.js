const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, '../formData.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const newEntry = { name, email, message, date: new Date().toISOString() };

  let data = [];
  if (fs.existsSync(dataFile)) {
    data = JSON.parse(fs.readFileSync(dataFile));
  }
  data.push(newEntry);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.json({ message: 'Saved successfully!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

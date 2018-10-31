require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('*', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
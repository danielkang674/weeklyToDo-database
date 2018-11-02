require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;
const MODE = process.env.MODE;

if (MODE === 'DEV') {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/db/days', async (req, res) => {
  try {
    const days = await db.getAllDays();
    res.json(days);
  } catch (err) {
    console.log('Express error getting all days', err.stack);
  }
});

app.post('/db/saveTodo', (req, res) => {
  console.log(req.body);
  res.end('got it');
});

app.get('*', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
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
    res.header("Access-Control-Allow-Methods", "*");
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

app.post('/db/saveTodo', async (req, res) => {
  try {
    const data = await db.saveTodoAndDay(req.body);
    // Data saved and returned from DB
    // console.log(data.rows[0]);
    res.sendStatus(200);
  } catch (err) {
    console.log('DB save todo and day', err.stack);
    res.sendStatus(400);
  }
});

app.get('/db/getTodo', async (req, res) => {
  try {
    const todos = await db.getTodosFromDay(req.query);
    res.json(todos.rows);
  } catch (err) {
    console.log('DB get todo from day input', err.stack);
    res.sendStatus(400);
  }
});

app.delete('/db/deleteTodo', async (req, res) => {
  try {
    const data = await db.deleteTodo(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log('DB delete todo', err.stack);
    res.sendStatus(400);
  }
});

app.get('*', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
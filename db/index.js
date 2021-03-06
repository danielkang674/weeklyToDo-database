const { Client } = require('pg');
const client = new Client(process.env.PG_URL);

client.connect()
  .then(() => console.log('db connected'))
  .catch(err => console.log('db failed to connect', err.stack));

module.exports.getAllDays = async () => {
  try {
    const days = await client.query('SELECT * FROM days');
    // only need the row data
    return days.rows;
  } catch (err) {
    console.log('DB getting all days', err.stack);
  };
};

module.exports.saveTodoAndDay = (todoAndDay) => {
  const { todo, day } = todoAndDay;
  return client.query('INSERT INTO todos (item, days_id) VALUES ($1, (SELECT id FROM days WHERE day = $2)) RETURNING *', [todo, day]);
};

module.exports.getTodosFromDay = (dayObj) => {
  const { day } = dayObj;
  return client.query('SELECT todos.id, todos.item FROM todos WHERE days_id = (SELECT days.id FROM days WHERE days.day = $1)', [day]);
};

module.exports.deleteTodo = (idObj) => {
  const { id } = idObj;
  return client.query('DELETE FROM todos WHERE id = $1', [id]);
};
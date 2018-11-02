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
    console.log('DB error getting all days', err.stack);
  }
};

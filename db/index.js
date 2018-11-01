const { Client } = require('pg');
const client = new Client({

});

try {
  await client.connect();
  console.log('connected to db');
} catch (err) {
  console.log('connection error to db', err.stack)
}

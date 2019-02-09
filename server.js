const express = require('express');
const { Client } = require('pg');
const PORT = 8080;
const SECRET_MESSAGE = process.env.SERVICE_MESSAGE || "I your node app";
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/postgres';

const client = new Client(connectionString);
const app = express();


app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${SECRET_MESSAGE}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200);
  res.send(`<form method="post" action="/postNumber">  Number:<input type='number' name='number'/>` +
    `<input type='submit'/></form>`)
});

app.get('/getNumber', (req, res) => {

  client.query('SELECT * FROM numbers', null, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500);
      res.end();
      return;
    };
    res.status(200);
    res.json(result.rows);
  });
});

app.get('/slow', (req, res) => {
  let start = Date.now();
  let end = start + 5000;
  while (Date.now() < end) {

  };
  res.status(200);
  res.send('<h2>Sorry!! Your response is little late :) </h2>');
});

app.post('/postNumber', (req, res) => {
  let number = req.body.number;
  let insertQuery = `INSERT INTO numbers VALUES(${number})`;
  client.query(insertQuery, null, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500);
    }
    else {
      res.status(200);
    }
    res.end();
  });
});

app.get('/health', (req, res) => {
  res.status(200);
  res.end();
});

client.connect()
  .then(function () {
    client.query('CREATE TABLE IF NOT EXISTS numbers(number integer);', (err, result) => {
      if (err) {
        console.log(`error occured while creating table ${err.message}`);
      }
      else {
        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
      }
    });
  })
  .catch(function (err) {
    console.log(err.message);
  });


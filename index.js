const express = require('express');
const bodyParser = require('body-parser');
const mdb = require('mongodb').MongoClient;
const mdbUri = 'mongodb://vintrr:mongo2018@test-shard-00-00-h3jv4.mongodb.net:27017,test-shard-00-01-h3jv4.mongodb.net:27017,test-shard-00-02-h3jv4.mongodb.net:27017/test?ssl=true&replicaSet=Test-shard-0&authSource=admin';

// 'mongodb+srv://vintrr:mongo2018@test-h3jv4.mongodb.net/test';

// 'mongodb://vintrr:mongo2018@test-shard-00-00-h3jv4.mongodb.net:27017,test-shard-00-01-h3jv4.mongodb.net:27017,test-shard-00-02-h3jv4.mongodb.net:27017/test?ssl=true&replicaSet=Test-shard-0&authSource=admin';

const app = express();

mdb.connect(mdbUri, function(err, client) {
  if (err) {
    console.log(`MDB Error: ${err.message}`);
  } else {
    console.log(`MDB OK!`);
    const collection = client.db('test').collection('devices');
    client.close();
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']);
  res.header("Allow", "GET,HEAD,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
  res.send('Hello!');
});

app.use((err, req, res, next) => {
  console.log('END!');
  res.send(`Error: ${err.message}`);
});

app.listen(3000);
console.log('The server start at 127.0.0.1:3000');
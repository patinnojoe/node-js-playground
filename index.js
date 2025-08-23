const express = require('express');
const mongodb = require('mongodb');
const app = express();
const connectionString = 'mongodb://localhost:27017';
const client = new mongodb.MongoClient(connectionString);
const db = client.db('studentDB');
const student = db.collection('student');
client
  .connect()
  .then(() => {
    console.log('connection succeful');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.json());

const middleware1 = (req, res, nxt) => {
  // throw new Error('error from 1');
  console.log('MIDDLEWARE');
  nxt();
};
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('ERROOOORRR faced');
};

app.use(middleware1);

app.get('/example', (req, res) => {
  console.log(nameY);
  res.send('You re on the home page but its cool');
  // res.render('pages/index.ejs');
});
app.post('/student', (req, res) => {
  const { name, age, email, dept } = req.body;
  student
    .insertMany(req.body)
    .then(() => {
      res.status(201).send('column added');
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.get('/student', (req, res) => {
  const { age } = req.query;

  student
    .find({ age: parseInt(age) })
    .toArray()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.put('/student', (req, res) => {
  const { age } = req.query;
  const { dept } = req.body;

  student
    .updateMany({ age: parseInt(age) }, { $set: { dept: dept } })
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: 'student updated uccefuly' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.delete('/student', (req, res) => {
  const { email } = req.query;

  student
    .findOneAndDelete({ email })
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: 'student deleted succefuly' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log('server running onport 800');
});

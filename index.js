const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const connectionString = 'mongodb://localhost:27017/studentDB';
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('connection successful');
  })
  .catch((error) => {
    console.log(error);
  });

const studentSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  dept: String,
});

const Student = mongoose.model('students', studentSchema);

// single
app.post('/student/signle', async (req, res, next) => {
  try {
    const { name, email, age, dept } = req.body;
    const newStudent = new Student({ name, email, age, dept });
    const data = await newStudent.save();

    res.status(200).json({ message: 'student created', data });
  } catch (error) {
    res.status(500).json({ errorMesage: error.message });
  }
});

// multiple
app.post('student/multiple', (req, res, next) => {});

app.listen(8000, () => {
  console.log('server running onport 800');
});

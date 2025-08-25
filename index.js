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
app.post('/student/multiple', async (req, res, next) => {
  try {
    const response = await Student.insertMany(req.body);
    console.log(req.body, 'D');
    res.status(200).json({ message: 'Students added' });
  } catch (error) {
    res.status(500).json({ errorMesage: error.message });
  }
});

// updte
app.put('/student/:id', async (req, res, next) => {
  try {
    // const { email } = req.query;
    const { dept } = req.body;
    const { id } = req.params;
    const student = await Student.findById(id);
    student.dept = dept;
    await student.save();
    // await Student.findOneAndUpdate({ email }, { dept });

    res.status(200).json({ message: 'Students updted' });
  } catch (error) {
    res.status(500).json({ errorMesage: error.message });
  }
});

app.listen(8000, () => {
  console.log('server running onport 800');
});

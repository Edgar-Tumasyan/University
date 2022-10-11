require('dotenv').config();
const sequelize = require('./db/connectDB');
const { User, University, Student, Post, Like } = require('./models/index');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

// Routers
const authRouter = require('./routes/authRoutes');
const studentRouter = require('./routes/studentRoutes');
const postRouter = require('./routes/postRoutes');
const universityRouter = require('./routes/universityRoutes');

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// routes middleware
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/university', universityRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

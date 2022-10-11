const express = require('express');

const router = express.Router();

const {
  createStudent,
  deleteStudent,
  updateStudent,
} = require('../controller/student');
const {
  authenticateUser,
  isAdmin,
  existingStudent,
  reqValues,
} = require('../middleware/index');

router.route('/').post(authenticateUser, isAdmin, createStudent);

router
  .route('/:id')
  .delete(authenticateUser, isAdmin, existingStudent, deleteStudent)
  .patch(authenticateUser, isAdmin, existingStudent, reqValues, updateStudent);

module.exports = router;

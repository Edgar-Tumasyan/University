const express = require('express');

const router = express.Router();

const {
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversity,
} = require('../controller/university');

const {
  authenticateUser,
  isAdmin,
  existingUniversity,
  reqValues,
} = require('../middleware/index');

router
  .route('/')
  .get(authenticateUser, getAllUniversities)
  .post(authenticateUser, isAdmin, existingUniversity, createUniversity);

router
  .route('/:id')
  .patch(
    authenticateUser,
    isAdmin,
    existingUniversity,
    reqValues,
    updateUniversity
  )
  .delete(authenticateUser, isAdmin, existingUniversity, deleteUniversity)
  .get(authenticateUser, existingUniversity, getUniversity);

module.exports = router;

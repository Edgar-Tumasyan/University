const { StatusCodes } = require('http-status-codes');
const { Student } = require('../models/index');

const existingStudent = async (req, res, next) => {
  const id = req.params.id;

  const [existingStudent] = await Student.findAll({
    where: { id },
  });

  if (!existingStudent) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Student with id ${id} does not exists` });
  }
  next();
};

module.exports = existingStudent;

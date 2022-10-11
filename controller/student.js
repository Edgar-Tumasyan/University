const { StatusCodes } = require('http-status-codes');
const Student = require('../models/student');

const createStudent = async (req, res) => {
  let { firstname, lastname, email, birthdate, university_id } = req.body;

  // check if student exists  // findOne don't work
  const [existingStudent] = await Student.findAll({ where: { email: email } });

  if (existingStudent) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Student already exists' });
  }

  // birthdate -1 day
  await Student.create({
    firstname,
    lastname,
    email,
    birthdate,
    university_id,
  });

  res.status(StatusCodes.CREATED).json('Student created');
};

const updateStudent = async (req, res) => {
  if (Object.keys(req.values).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'No values to updated' });
  }

  await Student.update(req.values, { where: { id: req.params.id } });

  res.status(StatusCodes.OK).json({ msg: 'Student values updated' });
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;

  await Student.destroy({ where: { id } });

  res.status(StatusCodes.OK).json({ msg: 'Student deleted' });
};

module.exports = { createStudent, deleteStudent, updateStudent };

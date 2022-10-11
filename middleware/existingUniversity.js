const { StatusCodes } = require('http-status-codes');
const { University } = require('../models/index');

const existingUniversity = async (req, res, next) => {
  if (req.method === 'POST') {
    const { name } = req.body;

    const [existingUniversity] = await University.findAll({
      where: { name },
    });

    if (existingUniversity) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `University with name ${name} already exists` });
    }
  }

  if (req.method !== 'POST') {
    const id = req.params.id;

    const [existingUniversity] = await University.findAll({ where: { id } });

    if (!existingUniversity) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `University with id ${req.params.id} does not exists` });
    }

    req.data = existingUniversity;
  }

  next();
};

module.exports = existingUniversity;

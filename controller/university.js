const { StatusCodes } = require('http-status-codes');
const { University, Post } = require('../models/index');
const sequelize = require('../db/connectDB');

const createUniversity = async (req, res) => {
  const { name, logo } = req.body;

  if (logo) {
    await University.create({ name, logo });
  } else {
    await University.create({ name });
  }

  res.status(StatusCodes.CREATED).json({ msg: 'University created' });
};

const updateUniversity = async (req, res) => {
  if (Object.keys(req.values).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'No values to updated' });
  }

  await University.update(req.values, { where: { id: req.params.id } });

  res.status(StatusCodes.OK).json({ msg: 'University updated' });
};

const deleteUniversity = async (req, res) => {
  await University.destroy({ where: { id: req.params.id } });

  res.status(StatusCodes.OK).json({ msg: 'University deleted' });
};

const getAllUniversities = async (req, res) => {
  const result = await University.findAll();

  res.status(StatusCodes.OK).json({ count: result.length, data: result });
};

const getUniversity = async (req, res) => {
  const posts = await Post.findAll({
    where: { university_id: req.data.id },
  });

  const popularPost = [];

  for (const post of posts) {
    if (!popularPost.length) {
      popularPost.push(post);
    }

    if (popularPost[0].likes < post.likes) {
      popularPost.shift();
      popularPost.push(post);
    }
  }

  res.status(StatusCodes.OK).json({ data: req.data, popularPost });
};

module.exports = {
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversity,
};

const { StatusCodes } = require('http-status-codes');
const { Post, Like, University } = require('../models/index');

const getAllPosts = async (req, res) => {
  const result = await Post.findAll();

  res.status(StatusCodes.OK).json({ count: result.length, data: result });
};

const getPost = async (req, res) => {
  const id = req.params.id;

  const result = await Post.findByPk(id);

  res.status(StatusCodes.OK).json({ data: result });
};

const createPost = async (req, res) => {
  const { description, image } = req.body;

  const user_id = req.user.userId;

  const university_id = req.user.universityId;

  if (university_id !== req.params.university_id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: `You can't post in this universities` });
  }

  try {
    if (image) {
      await Post.create({ description, image, university_id, user_id });
    } else {
      await Post.create({ description, university_id, user_id });
    }
  } catch (error) {
    if (
      error.message === 'Validation error: Validation len on description failed'
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Maximum wordcount of a post is 200 words' });
    }
  }

  await University.increment('count_of_posts', {
    where: { id: university_id },
  });

  res.status(StatusCodes.CREATED).json({ msg: 'Post created' });
};

const updatePost = async (req, res) => {
  if (Object.keys(req.values).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'No values to updated' });
  }

  await Post.update(req.values, { where: { id: req.params.id } });

  res.status(StatusCodes.OK).json({ msg: 'Post updated' });
};

const deletePost = async (req, res) => {
  await Post.destroy({ where: { id: req.params.id } });

  res.status(StatusCodes.OK).json({ msg: 'Post deleted' });
};

const likePost = async (req, res) => {
  const post_id = req.params.id;

  const user_id = req.user.userId;

  const [existingLike] = await Like.findAll({
    where: { user_id: user_id, post_id: post_id },
  });

  if (existingLike) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: ' One user can like only once' });
  }

  await Post.increment('likes', { where: { id: post_id } });

  await Like.create({ user_id, post_id });

  res.status(StatusCodes.CREATED).json({ msg: 'Thanks for like' });
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
};

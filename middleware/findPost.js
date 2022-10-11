const { Post } = require('../models/index');
const { StatusCodes } = require('http-status-codes');

const findPost = async (req, res, next) => {
  const id = req.params.id;

  const post = await Post.findOne({ where: { id, user_id: req.user.userId } });

  if (!post) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Post can update or delete only user who created it' });
  }
  next();
};

module.exports = findPost;

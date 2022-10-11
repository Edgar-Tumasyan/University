const express = require('express');
const {
  authenticateUser,
  findPost,
  reqValues,
} = require('../middleware/index');

const router = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require('../controller/post');

router.route('/').get(authenticateUser, getAllPosts);

router.route('/:university_id').post(authenticateUser, createPost);

router
  .route('/:id')
  .get(authenticateUser, getPost)
  .patch(authenticateUser, findPost, reqValues, updatePost)
  .delete(authenticateUser, findPost, deletePost);

router.route('/likes/:id').post(authenticateUser, likePost);

module.exports = router;

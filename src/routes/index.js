const express = require('express');

const router = express.Router();

const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const postRouter = require('./post.route');
const uploadRouter = require('./upload.route');

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/upload', uploadRouter);

module.exports = router;
const express = require('express');
const session = require('express-session')
const router = express.Router();

const commentController = require('../controllers/Comments.cjs');

router.post('/addComment', commentController.addComment);

router.get('/getComments', commentController.getComments);

router.get('/getCountComments', commentController.getCountComments);

module.exports = router;

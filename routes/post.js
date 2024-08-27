const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../utils/isLoggedIn');
const { createPost, deleteBlog, likepage } = require('../controllers/postControllers');

router.post('/createpost',isLoggedIn,createPost);

router.get('/deleteBlog/:id',deleteBlog)

router.get('/likes/:pid',isLoggedIn,likepage)

module.exports = router;
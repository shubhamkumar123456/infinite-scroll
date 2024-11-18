const express = require('express');
const { createPost, getAllPost, updatePost, deletePost } = require('../controllers/postController');
const checkToken = require('../middleware/checkToken');
const router = express.Router();


router.post('/create',checkToken,createPost)
router.get('/getAllpost',getAllPost)
router.put('/update/:_id',updatePost)
router.delete('/delete/:_id',deletePost)



module.exports = router 
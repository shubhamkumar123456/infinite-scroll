const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');
const checkToken = require('../middleware/checkToken');
const router = express.Router();


router.post('/create',registerUser);
router.post('/login',loginUser);
router.put('/update/:_id',updateUser);
router.delete('/delete/:_id',checkToken,deleteUser)

module.exports = router




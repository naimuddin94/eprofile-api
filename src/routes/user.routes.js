const express = require('express');
const {
    getAllDataFn,
    getSingleDataFn,
    updateFn,
    deleteFn,
    getUserRoleFn,
} = require('../controller/shared.controller');
const { registerUser } = require('../controller/user.controller');
const User = require('../models/user.model');
const { verifyToken, verifyAdmin } = require('../middleware');

const userRouter = express.Router();

userRouter.get('/', verifyToken, verifyAdmin, getAllDataFn(User));
userRouter.get('/:id', getSingleDataFn(User));
userRouter.get('/role/:email', getUserRoleFn(User));
userRouter.post('/', registerUser);
userRouter.put('/:id', updateFn(User));
userRouter.delete('/:id', deleteFn(User));

module.exports = userRouter;

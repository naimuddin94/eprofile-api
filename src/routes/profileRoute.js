const express = require('express');
const {
    getAllDataFn,
    createFn,
    getSingleDataFn,
    updateFn,
    deleteFn,
    getUserRoleFn,
} = require('../controller/shared');
const Profile = require('../models/profile.model');

const profileRouter = express.Router();

profileRouter.get('/', getAllDataFn(Profile));
profileRouter.get('/:id', getSingleDataFn(Profile));
profileRouter.get('/role/:email', getUserRoleFn(Profile));
profileRouter.post('/', createFn(Profile));
profileRouter.put('/:id', updateFn(Profile));
profileRouter.delete('/:id', deleteFn(Profile));

module.exports = profileRouter;

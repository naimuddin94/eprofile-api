/* eslint-disable object-curly-newline */
const express = require('express');
const { getAllDataFn, createFn, deleteFn } = require('../controller/shared');
const Profile = require('../models/profile.model');
const { getDataByOwnerIdFn, updateByOwnerIdFn } = require('../controller/ownerShip');

const profileRouter = express.Router();

profileRouter.get('/', getAllDataFn(Profile));
profileRouter.get('/:id', getDataByOwnerIdFn(Profile));
profileRouter.post('/', createFn(Profile));
profileRouter.put('/:id', updateByOwnerIdFn(Profile));
profileRouter.delete('/:id', deleteFn(Profile));

module.exports = profileRouter;

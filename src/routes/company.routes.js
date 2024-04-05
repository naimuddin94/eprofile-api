/* eslint-disable prettier/prettier */
const express = require('express');
const multer = require('multer');
const { getAllDataFn, deleteFn, createFn } = require('../controller/shared.controller');
const Company = require('../models/company.model');
const { getDataByOwnerIdFn, updateByOwnerIdFn } = require('../controller/ownerShared.controller');

const upload = multer();

const companyRouter = express.Router();

companyRouter.get('/', getAllDataFn(Company));
companyRouter.get('/:id', getDataByOwnerIdFn(Company));
companyRouter.post(
    '/',
    upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]),
    createFn(Company),
);
companyRouter.put('/:id', updateByOwnerIdFn(Company));
companyRouter.delete('/:id', deleteFn(Company));

module.exports = companyRouter;

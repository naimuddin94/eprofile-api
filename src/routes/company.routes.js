/* eslint-disable prettier/prettier */
// dependencies
const express = require('express');
const multer = require('multer');
const Company = require('../models/company.model');
const { deleteFn } = require('../controller/shared.controller');
const {
  createCompany,
  getSingleCompanyByCreator,
  updateCompany,
} = require('../controller/company.controller');
const { verifyToken } = require('../middleware/token.middleware');
const {
  getDataByOwnerIdFn,
} = require('../controller/ownerShared.controller');

const upload = multer();

const companyRouter = express.Router();

companyRouter
  .route('/')
  .get(verifyToken, getSingleCompanyByCreator)
  .post(
    verifyToken,
    upload.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'coverPhoto', maxCount: 1 },
    ]),
    createCompany,
  );

companyRouter
  .route('/:id')
  .get(getDataByOwnerIdFn(Company))
  .put(updateCompany)
  .delete(deleteFn(Company));

module.exports = companyRouter;

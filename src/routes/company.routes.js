/* eslint-disable prettier/prettier */
// dependencies
const express = require('express');
const multer = require('multer');
const {
  createCompany,
  getSingleCompany,
  updateCompany,
  getOwnerCompanies,
  getAllPublishedCompany,
  deleteCompany,
} = require('../controller/company.controller');
const { verifyToken } = require('../middleware/token.middleware');

const upload = multer();

const companyRouter = express.Router();

companyRouter
  .route('/')
  .get(verifyToken, getAllPublishedCompany)
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
  .get(verifyToken, getSingleCompany)
  .put(verifyToken, updateCompany)
  .delete(verifyToken, deleteCompany);

companyRouter.route('/my/company').get(verifyToken, getOwnerCompanies);

module.exports = companyRouter;

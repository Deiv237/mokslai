const express = require('express');
const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  UpdateInvoice,
  DeleteInvoice,
  GetFilteredInvoices,
  GetDraftInvoices,
} = require('../Controllers/invoiceController');
const validate = require('../validators/validate');
const pageValidate = require('../validators/pageValidate');
const { protect, allowAccessTo } = require('../Controllers/authController');

const router = express.Router();

router.route(`/`).get(getAllInvoices).post(createInvoice);
router
  .route(`/:id`)
  .get(getInvoiceById)
  .patch(protect, allowAccessTo('admin'), validate, UpdateInvoice)
  .delete(protect, allowAccessTo('admin'), validate,DeleteInvoice);
router.route(`/filter`).get(pageValidate, validate, GetFilteredInvoices);
router.route(`/draft`).get(GetDraftInvoices);

module.exports = router;

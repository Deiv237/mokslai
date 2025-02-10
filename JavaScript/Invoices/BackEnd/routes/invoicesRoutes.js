const express = require('express');
const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  UpdateInvoice,
  DeleteInvoice,
  getFilteredInvoices,
} = require('../Controllers/invoiceController');
const validate = require('../validators/validate');

const router = express.Router();

router.route(`/`).get(getAllInvoices).post(createInvoice).get(validate, getFilteredInvoices);
router.route(`/:id`).get(getInvoiceById).patch(UpdateInvoice).delete(DeleteInvoice);
// router.route(`/filter`).get(getFilteredInvoices);

module.exports = router;

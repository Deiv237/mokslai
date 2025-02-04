const express = require('express');
const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  UpdateInvoice,
  DeleteInvoice,
} = require('../Controllers/invoiceController');

const router = express.Router();

router.route(`/`).get(getAllInvoices).post(createInvoice);
router.route(`/:id`).get(getInvoiceById).patch(UpdateInvoice).delete(DeleteInvoice);

module.exports = router;

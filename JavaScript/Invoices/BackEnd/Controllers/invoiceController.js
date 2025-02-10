const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  UpdateInvoice,
  DeleteInvoice,
  filterInvoices,
} = require('../models/invoiceModel');
const AppError = require('../utils/appError');

console.log("invoicesRoutes.js"); // Log the file call

exports.getAllInvoices = async (req, res, next) => {
  try {
    const result = await getAllInvoices();
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getInvoiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getInvoiceById(id);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.createInvoice = async (req, res, next) => {
  try {
    const result = req.body;
    const createdInvoice = await createInvoice(result);
    res.status(201).json({
      status: 'success',
      data: createdInvoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.UpdateInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = req.body;
    const updatedInvoice = await UpdateInvoice(id, result);
    res.status(200).json({
      status: 'success',
      data: updatedInvoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.DeleteInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await DeleteInvoice(id);
    res.status(200).json({
      status: 'success',
      data: deletedInvoice,
    });
  } catch (error) {
    next(error);
  }
};


exports.getFilteredInvoices = async (req, res, next) => {
  console.log("getFilteredInvoices"); // Log the function call
  try {
    const result = await filterInvoices({ status: req.query.status });
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
// exports.getFilteredInvoices = async (req, res, next) => {
//   try {
//     const filter = req.query;

//     if (Object.keys(filter).length === 0) {
//       const invoices = await getAllInvoices();
//       res.status(200).json({
//         status: 'success',
//         data: invoices,
//       });
//     } else {
//       const filteredInvoices = await filterInvoices(filter);

//       if (filteredInvoices.length === 0) {
//         res.status(404).json({
//           status: 'fail',
//           message: 'No invoices found with the specified status',
//         });
//       } else {
//         res.status(200).json({
//           status: 'success',
//           data: filteredInvoices,
//         });
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// };
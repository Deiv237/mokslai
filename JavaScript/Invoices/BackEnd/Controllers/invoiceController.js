const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  UpdateInvoice,
  DeleteInvoice,
  filterInvoices,
  getDraftInvoices,
} = require('../models/invoiceModel');
const AppError = require('../utils/appError');

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

// exports.getFilteredInvoices = async (req, res) => {
//   try {
//     const filter = req.query;

//     const filteredInvoices = await filterInvoices(filter);

//     res.status(200).json({
//       status: "success",
//       data: filteredInvoices,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

exports.GetFilteredInvoices = async (req, res, next) => {
  try {
    const filter = req.query;
    let page = parseInt(filter.page);
    let limit = parseInt(filter.limit);

    const offset = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid page or limit value',
      });
    }

    const filteredInvoices = await filterInvoices(filter, limit, offset);

    res.status(200).json({
      status: 'success',
      data: filteredInvoices,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetDraftInvoices = async (req, res, next) => {
  try {
    const result = await getDraftInvoices();
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
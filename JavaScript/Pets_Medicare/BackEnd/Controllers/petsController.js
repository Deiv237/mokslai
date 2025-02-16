const {
  getAllpets,
  getpetById,
  createpet,
  Updatepet,
  Deletepet,
  filterpets,
  getDraftpets,
} = require('../models/petsModel');
const AppError = require('../utils/appError');

exports.getAllPets = async (req, res, next) => {
  try {
    const result = await getAllpets();
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getpetById(id);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.createPet = async (req, res, next) => {
  try {
    const result = req.body;
    const createdpet = await createpet(result);
    res.status(201).json({
      status: 'success',
      data: createdpet,
    });
  } catch (error) {
    next(error);
  }
};

exports.UpdatePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = req.body;
    const updatedpet = await Updatepet(id, result);
    res.status(200).json({
      status: 'success',
      data: updatedpet,
    });
  } catch (error) {
    next(error);
  }
};

exports.DeletePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedpet = await Deletepet(id);
    res.status(200).json({
      status: 'success',
      data: deletedpet,
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

exports.GetFilteredPets = async (req, res, next) => {
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

    const filteredpets = await filterpets(filter, limit, offset);

    res.status(200).json({
      status: 'success',
      data: filteredpets,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetDraftPets = async (req, res, next) => {
  try {
    const result = await getDraftpets();
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
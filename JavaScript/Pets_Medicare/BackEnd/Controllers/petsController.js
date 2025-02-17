const {
  getAllpets,
  getpetById,
  createpet,
  Updatepet,
  Deletepet,
  FilterPets,
} = require('../models/petsModel');
// const Pet = require('../models/petsModel').Pet;
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

exports.searchClients = async (req, res) => {
  try {
    const sort = req.query.sort;
    const sortOrder = req.query.sortOrder;
    const pets = await FilterPets(sort, sortOrder);
    res.status(200).json(pets);
  } catch (err) {
    console.error("Error searching pets:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.getPets = async (req, res) => {
//   try {
//     const { search, name, date, time, sortField = "date", sortOrder = "asc" } =
//       req.query;
//     const { id } = req.params;

//     // Create filter object
//     let filter = { owner: id };
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { owner: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//       ];
//     }
//     if (name) filter.name = new RegExp(name, "i"); // Case-insensitive name search
//     if (date) filter.date = new Date(date);
//     if (time) filter.time = time;

//     // Sorting
//     const sortOptions = {};
//     if (["name", "date", "time"].includes(sortField)) {
//       sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
//     }

//     const pets = await Pet.findAll({
//       where: filter,
//       order: [[sortField, sortOrder]],
//     });

//     res.status(200).json({ status: "success", data: pets });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };
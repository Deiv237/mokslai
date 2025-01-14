//2. filter tours using query string
exports.getFilteredTours = async (req, res) => {
  try {
    const filter = req.query;
    console.log(filter);

    // If no query string, return all tours
    if (Object.keys(filter).length === 0) {
      const tours = await getAllTours();
      res.status(200).json({
        status: 'success',
        data: tours,
      });
      return;
    }

    // Validate filter fields
    const allowedFields = ['duration', 'difficulty', 'price', 'sort'];
    for (const key of Object.keys(filter)) {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({
          status: 'fail',
          message: `Invalid filter field: '${key}'. Allowed fields are: ${allowedFields.join(
            ', '
          )}`,
        });
      }
    }

    // Validate numeric parameters
    if (!Number(filter.duration) || filter.duration < 0) {
      throw new Error('Invalid duration');
    }
    if (!Number(filter.price) || filter.price < 0) {
      throw new Error('Invalid price');
    }

    // Validate difficulty against allowed values
    const validDifficulties = ['easy', 'medium', 'difficult'];
    if (!validDifficulties.includes(filter.difficulty)) {
      throw new Error('Invalid difficulty');
    }

    // If query string, return filtered tours
    const filteredTours = await filterTours(filter);

    res.status(200).json({
      status: 'success',
      data: filteredTours,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
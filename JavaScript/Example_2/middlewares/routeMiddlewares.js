//Third middleware
exports.deleteMidleware = (req, res, next) => {
    console.log("Delete midleware");
    next();
};
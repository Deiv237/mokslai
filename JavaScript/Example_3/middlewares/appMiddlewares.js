//First middleware
exports.sayHello = (req, res, next) => {
    console.log("Hello from middleware!👋");
    next();
};

//Second middleware
exports.addDate = (req, res, next) => {
    req.requestedTime = new Date().toISOString();
    next();
};
const {query} = require("express-validator");

exports.postAuthValidate = [

        query("name")
        .isLength({min: 2})
        .withMessage("Name must be at least 2 characters long"),

        query("birthDate")
        .isDate()
        .withMessage("Birthdate must be a valid date"),

        query("biography")
        .isLength({min: 3, max: 150})
        .withMessage("Biography must be at least 3 characters long and at most 150 characters long"),
        
    ];
const { validationResult, check } = require('express-validator');

// Middleware to handle validation errors
const validationandHandlerrors = (req, res, next) => {
    const errors = validationResult(req); // Corrected to use validationResult
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next(); // Proceed to the next middleware or route handler if no errors
};

const validation ={
    validateTitle :[
        check('name').not().isEmpty().withMessage('Name is required')
        .isString().withMessage("name must be a string"),
    ]
}

module.exports = {
    validation,
    validationandHandlerrors
};




// const notEmpty = (value) => {
//     if (typeof value === 'string' && value.trim().length === 0) {
//         throw new Error('This field cannot be empty.');
//     }
//     return true;
// };
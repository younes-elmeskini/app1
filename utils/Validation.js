const { validationResult, check } = require('express-validator');

// Middleware to handle validation errors
const validationandHandlerrors = (req, res, next) => {
    const errors = validationResult(req); // Corrected to use validationResult
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Name is required " });
    }
    next(); // Proceed to the next middleware or route handler if no errors
};

const validateTags =[
    check('name').not().isEmpty().withMessage('Name is required'),
]


module.exports = {
    validationandHandlerrors
};




// const notEmpty = (value) => {
//     if (typeof value === 'string' && value.trim().length === 0) {
//         throw new Error('This field cannot be empty.');
//     }
//     return true;
// };
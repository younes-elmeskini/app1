const express = require('express');
const router = express.Router();
const { addTags } = require('../controllers/NotesController');
const { validationandHandlerrors ,validateTags } = require('../utils/Validation');
const { body } = require('express-validator')




router.post('/tags',validateTags, validationandHandlerrors ,addTags);

module.exports = router;

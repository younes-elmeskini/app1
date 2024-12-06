const express = require('express');
const router = express.Router();
const { addTags, getTags, getTagById ,updateTagById ,deleteTagById, addCategory, getCategories, getCategoryById, updateCategoryById, deleteCategoryById} = require('../controllers/NotesController');
const { validationandHandlerrors ,validation } = require('../utils/Validation');
const { body } = require('express-validator')

router.post('/tags',validation.validateTitle, validationandHandlerrors ,addTags);

router.get('/tags', getTags);

router.get('/tags/:id', getTagById)

router.put('/tags/:id', validation.validateTitle, validationandHandlerrors, updateTagById);

router.delete('/tags/:id', deleteTagById);

router.post('/Categories',validation.validateTitle, validationandHandlerrors ,addCategory);

router.get('/Categories', getCategories);

router.get('/Categories/:id', getCategoryById)

router.put('/Categories/:id', validation.validateTitle, validationandHandlerrors, updateCategoryById);

router.delete('/Categories/:id', deleteCategoryById);
 
module.exports = router;

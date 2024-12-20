const express = require('express');
const router = express.Router();
const { addTags, getTags, getTagById ,updateTagById ,deleteTagById,
     addCategory, getCategories, getCategoryById, updateCategoryById, deleteCategoryById,
    addNotes, getNotes } = require('../controllers/NotesController');
const { validationandHandlerrors ,validation } = require('../utils/Validation');
const { isAuthenticated } = require('../utils/Auth');
const { body } = require('express-validator');

router.post('/notes', isAuthenticated, addNotes);

router.get('/notes', isAuthenticated, getNotes);

router.post('/tags',validation.validateName, validationandHandlerrors ,addTags);

router.get('/tags', getTags);

router.get('/tags/:id', getTagById);

router.put('/tags/:id', validation.validateName, validationandHandlerrors, updateTagById);

router.delete('/tags/:id', deleteTagById);

router.post('/Categories',validation.validateName, validationandHandlerrors ,addCategory);

router.get('/Categories', getCategories);

router.get('/Categories/:id', getCategoryById)

router.put('/Categories/:id', validation.validateName, validationandHandlerrors, updateCategoryById);

router.delete('/Categories/:id', deleteCategoryById);
 
module.exports = router;

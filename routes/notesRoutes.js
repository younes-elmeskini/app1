const express = require('express');
const router = express.Router();
const { addTags } = require('../controllers/NotesController');

router.post('/tags', addTags);

module.exports = router;

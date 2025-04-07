const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');

const router = express.Router();

// Роут для добавления комментария
router.post('/add-comment', addComment);

// Роут для получения всех комментариев
router.get('/', getComments);

module.exports = router;

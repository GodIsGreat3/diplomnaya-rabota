const Comment = require('../models/commentModel');  // Убедись, что путь правильный


// Функция для добавления комментария
exports.addComment = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Комментарий не может быть пустым' });
  }

  try {
    const newComment = await Comment.create({ text });
    return res.status(200).json({
      message: 'Комментарий успешно добавлен',
      comment: newComment,
    });
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    return res.status(500).json({ message: 'Ошибка при добавлении комментария' });
  }
};

// Функция для получения всех комментариев
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    return res.status(200).json(comments);
  } catch (error) {
    console.error('Ошибка при загрузке комментариев:', error);
    return res.status(500).json({ message: 'Ошибка при загрузке комментариев' });
  }
};

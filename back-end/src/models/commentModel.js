const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,  // Текст комментария не может быть пустым
  },
}, {
  tableName: 'comments',  // Имя таблицы в базе данных
  timestamps: false,  // Без временных меток (createdAt, updatedAt)
});

module.exports = Comment;

const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "❌ Заполните все поля" });
  }

  try {
    const user = await User.create({ email, password });
    res.status(201).json({ message: "✅ Пользователь зарегистрирован", user });
  } catch (error) {
    console.error("❌ Ошибка при регистрации:", error);
    res.status(500).json({ error: "Ошибка при регистрации" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "❌ Заполните все поля" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "❌ Пользователь не найден" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "❌ Неверный пароль" });
    }

    res.status(200).json({ message: "✅ Успешный вход", user });
  } catch (error) {
    console.error("❌ Ошибка при авторизации:", error);
    res.status(500).json({ error: "Ошибка при авторизации" });
  }
};

module.exports = { registerUser, loginUser };

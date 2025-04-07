const express = require("express");
const cors = require("cors");
const sequelize = require("./src/db");
const userRoutes = require("./src/routes/userRoutes");
const commentRoutes = require("./src/routes/commentRoutes"); 
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);

app.use("/api/comments", commentRoutes); 

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => console.log("✅ База данных синхронизирована"))
  .catch(err => console.error("❌ Ошибка синхронизации базы:", err));

app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));

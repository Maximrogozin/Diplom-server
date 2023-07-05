// логин базы данных makcn73
// пароль базы данных  miu27C2dlP2K1xxT

const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDatabase = require("./startUp/initDatabase");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get("port") ?? 8080;

// подключение mongoose
async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`MongoDB connected.`));
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}
start();
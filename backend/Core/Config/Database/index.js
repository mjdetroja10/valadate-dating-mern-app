const chalk = require("chalk");
const mongoose = require("mongoose");
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_DATABASE;

const connectMongo = async () => {
  try {
    await mongoose.connect(`${dbPort}/${dbName}`).then(() => {
      console.log(chalk.bgBlueBright("`mongodb connected successfully`"));
    });
  } catch (error) {
    console.log(chalk.bgRed("mongodb error: ", error));
  }
};

module.exports = connectMongo;

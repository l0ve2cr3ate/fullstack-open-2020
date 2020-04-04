require("dotenv").config();

let PORT = process.env.PORT;
let MONGO_URI = process.env.MONGO_URI;

module.exports = {
  MONGO_URI,
  PORT,
};

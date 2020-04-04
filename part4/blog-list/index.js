require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to db");
  })
  .catch((err) => {
    logger.error("Error connecting to db", err.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

const PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

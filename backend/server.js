const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const articleRoutes = require("./routes/articles");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("./models/db");

const app = express();
const port = 6000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

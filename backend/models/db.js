// npm i mongoose

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crud-blog");
const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("Connection to DB....");
});
conn.on("error", () => {
  console.log("Connection lost from DB....");
});
conn.on("disconnected", () => {
  console.log("Disconnected from DB....");
});

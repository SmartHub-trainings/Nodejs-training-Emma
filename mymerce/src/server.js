const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/db");
const { MONGODB_URI } = require("./config/constants");
const app = express();
const multer = require("multer");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(db);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DataBASE CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/products", require("./routes/products"));
app.use("/auth", require("./routes/auth"));

app.use("*", (req, res) => {
  return res.status(404).json({ error: { messgage: "Not Found" } });
});

const PORT = process.env.PORT || 6005;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Running on port " + PORT);
  }
});

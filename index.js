require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Person = require("./models/Person");
const routes = require("./routes/routes");

mongoose.connect(
  `mongodb+srv://${process.env.DATA_USER}:${process.env.DATA_PASS}@apicluster.7vmel.mongodb.net/myApiDatabase?retryWrites=true&w=majority`
);

let db = mongoose.connection;
db.on("error", () => console.log("erro no banco de dados"));
db.once("open", () => console.log("banco de dados rodando perfeitamente"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/person", routes);

app.listen(3000, () => console.log("server running"));

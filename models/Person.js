const { Schema, model } = require("mongoose");

const Person = Schema({
  name: { type: String, required: true },
  salary: { type: Number },
  approved: { type: Boolean },
});

module.exports = model("Person", Person);

const Person = require("../models/Person");

const registerPerson = async (req, res) => {
  const authUserExist = await Person.findOne({ name: req.body.name });
  if (authUserExist) return res.status(400).send("name already exist");

  const { name, salary, approved } = req.body;

  const person = new Person({ name, salary, approved });
  try {
    const savedPerosn = await person.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const readPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(404).send("Nenhuma pessoa encontradas", error);
  }
};

const showPerson = async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      res.status(404).send("essa pessoa não existe");
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(404).send("Pessoa não encontrada", error);
  }
};

const updatePerson = async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const personUpdate = await Person.updateOne({ _id: id }, person);
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deletePerson = async (req, res) => {
  const id = req.params.id;
  try {
    await Person.deleteOne({ _id: id });

    res.status(200).send("Usuário deletado com sucesso");
  } catch (error) {
    res.status(404).send("Pessoa não encontrada", error);
  }
};

module.exports = {
  registerPerson,
  readPeople,
  showPerson,
  updatePerson,
  deletePerson,
};

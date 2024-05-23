const users = require('../models/user');
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({}, { password: 0 });
  next();
};

const findUserById = async (req, res, next) => {
  req.user = await users.findById(req.params.id, { password: 0 });
  next();
};

const createUser = async (req, res, next) => {
  try {
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.updateOne({ _id: req.params.id }, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка редактирования пользователя" }));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await users.deleteOne({ _id: req.params.id });
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    next();
    return;
  }

  res.setHeader("Content-Type", "application/json");

  if (!name) {
    res.status(400).send(JSON.stringify({ message: "Не заполнено имя" }));
  }

  if (!email) {
    res.status(400).send(JSON.stringify({ message: "Не заполнен email" }));
  }

  if (!password) {
    res.status(400).send(JSON.stringify({ message: "Не заполнен пароль" }));
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  const { name, email } = req.body;
  if (name && email) {
    next();
    return;
  }

  res.setHeader("Content-Type", "application/json");

  if (!name) {
    res.status(400).send(JSON.stringify({ message: "Не заполнено имя" }));
  }

  if (!email) {
    res.status(400).send(JSON.stringify({ message: "Не заполнен email" }));
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;

    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  hashPassword,
};

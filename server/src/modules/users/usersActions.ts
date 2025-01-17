import type { RequestHandler } from "express";

import usersRepository from "./usersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const usersId = Number(req.params.id);
    const users = await usersRepository.read(usersId);

    if (users === null) {
      res.sendStatus(404);
    } else {
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUsers = {
      id: Number(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    };

    const existUsers = await usersRepository.readAllEmail();

    const userExists = existUsers.some(
      (existUser) => existUser.email === newUsers.email,
    );

    if (userExists) {
      res
        .status(409)
        .json({ error: "Il existe déjà un utilisateur avec cette email" });
      return;
    }

    if (newUsers.firstname.length < 2 || newUsers.firstname.length > 20) {
      res
        .status(400)
        .json({ error: "Le prénom doit contenir entre 2 et 20 caractères" });
      return;
    }

    if (newUsers.lastname.length < 2 || newUsers.lastname.length > 20) {
      res
        .status(400)
        .json({ error: "Le nom doit contenir entre 2 et 20 caractères" });
      return;
    }

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
    if (!nameRegex.test(newUsers.firstname)) {
      res
        .status(400)
        .json({ error: "Le prénom ne doit contenir que des lettres" });
      return;
    }

    if (!nameRegex.test(newUsers.lastname)) {
      res
        .status(400)
        .json({ error: "Le nom ne doit contenir que des lettres" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUsers.email)) {
      res.status(400).json({ error: "L'email n'est pas valide" });
      return;
    }

    const password = newUsers.password;
    const passwordRequirements = [
      {
        regex: /.{8,}/,
        message: "Le mot de passe doit contenir au moins 8 caractères",
      },
      {
        regex: /[A-Z]/,
        message: "Le mot de passe doit contenir au moins une lettre majuscule",
      },
      {
        regex: /[a-z]/,
        message: "Le mot de passe doit contenir au moins une lettre minuscule",
      },
      {
        regex: /[0-9]/,
        message: "Le mot de passe doit contenir au moins un chiffre",
      },
      {
        regex: /[^A-Za-z0-9]/,
        message:
          "Le mot de passe doit contenir au moins un caractère spécial (par exemple, -!@#$%^&*)",
      },
    ];

    for (const requirement of passwordRequirements) {
      if (!requirement.regex.test(password)) {
        res.status(400).json({ error: requirement.message });
        return;
      }
    }

    newUsers.firstname =
      newUsers.firstname.charAt(0).toUpperCase() +
      newUsers.firstname.slice(1).toLowerCase();
    newUsers.lastname =
      newUsers.lastname.charAt(0).toUpperCase() +
      newUsers.lastname.slice(1).toLowerCase();

    const insertId = await usersRepository.create(
      newUsers.firstname,
      newUsers.lastname,
      newUsers.email,
      newUsers.password,
    );

    newUsers.password = undefined;

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await usersRepository.readByEmail(email);

    if (!user) {
      res.status(404).json({ message: "ce compte n'existe pas" });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ message: "identifants incorrect" });
      return;
    }

    user.password = undefined;

    res.json({
      user,
    });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
    next(err);
  }
};

const editFirstname: RequestHandler = async (req, res, next) => {
  try {
    const users = {
      id: Number(req.params.id),
      firstname: req.body.firstname,
    };

    const affectedRows = await usersRepository.updateFirstname(
      users.id,
      users.firstname,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const editLastname: RequestHandler = async (req, res, next) => {
  try {
    const users = {
      id: Number(req.params.id),
      lastname: req.body.lastname,
    };

    const affectedRows = await usersRepository.updateLastname(
      users.id,
      users.lastname,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const editEmail: RequestHandler = async (req, res, next) => {
  try {
    const users = {
      id: Number(req.params.id),
      email: req.body.email,
    };

    const affectedRows = await usersRepository.updateEmail(
      users.id,
      users.email,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const editPhoneNumber: RequestHandler = async (req, res, next) => {
  try {
    const users = {
      id: Number(req.params.id),
      phone_number: req.body.phone_number,
    };

    const affectedRows = await usersRepository.updatePhoneNumber(
      users.id,
      users.phone_number,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const editPassword: RequestHandler = async (req, res, next) => {
  try {
    const users = {
      id: Number(req.params.id),
      password: req.body.password,
    };

    const affectedRows = await usersRepository.updatePassword(
      users.id,
      users.password,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const usersId = Number(req.params.id);
    await usersRepository.delete(usersId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  add,
  editFirstname,
  editLastname,
  editEmail,
  editPhoneNumber,
  editPassword,
  destroy,
  login,
};

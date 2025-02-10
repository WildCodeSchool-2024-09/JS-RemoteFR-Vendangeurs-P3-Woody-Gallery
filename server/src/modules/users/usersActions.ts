import argon2 from "argon2";
import type { RequestHandler } from "express";

const hashingOptions = {
  type: argon2.argon2d,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

import { generateToken } from "./authTools/authTools";
import usersRepository from "./usersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const browseUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersRepository.readAllUsers();

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
        .json({ error: "Il existe déjà un utilisateur avec cet email" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUsers.email)) {
      res.status(400).json({ error: "L'email n'est pas valide" });
      return;
    }

    const firstname = newUsers.firstname;
    const firstnameRequirements = [
      {
        regex: /.{2,20}/,
        message: "Le prénom doit contenir entre 2 et 20 caractères",
      },
      {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
        message: "Le prénom ne doit contenir que des lettres",
      },
    ];

    for (const requirement of firstnameRequirements) {
      if (!requirement.regex.test(firstname)) {
        res.status(400).json({ error: requirement.message });
        return;
      }
    }

    const lastname = newUsers.lastname;
    const lastnameRequirements = [
      {
        regex: /.{2,20}/,
        message: "Le nom doit contenir entre 2 et 20 caractères",
      },
      {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
        message: "Le nom ne doit contenir que des lettres",
      },
    ];

    for (const requirement of lastnameRequirements) {
      if (!requirement.regex.test(lastname)) {
        res.status(400).json({ error: requirement.message });
        return;
      }
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

    const hashedPassword = await argon2.hash(newUsers.password, hashingOptions);

    const insertId = await usersRepository.create(
      newUsers.firstname,
      newUsers.lastname,
      newUsers.email,
      hashedPassword,
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

    const userVerify = await usersRepository.readByEmail(email);

    if (!userVerify) {
      res.status(404).json({ message: "ce compte n'existe pas" });
      return;
    }

    const verify = await argon2.verify(userVerify.password, password);

    if (!verify) {
      res.status(401).json({ message: "Identifiants incorrects" });
      return;
    }

    const { password: _, ...user } = userVerify;
    user.password = undefined;

    const userForToken = {
      userId: user.id,
      isAdmin: user.isAdmin,
    };

    const token = generateToken({ user: userForToken });

    res
      .cookie("authToken", token, {
        httpOnly: false,
        sameSite: "strict",
        maxAge: 24 * 1000 * 60 * 60,
      })
      .status(200)
      .json({ message: "Connection réussie", user });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
    next(err);
  }
};

const editPassword: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const { oldPassword, newPassword } = req.body;

    const user = await usersRepository.read(userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }
    const passwordMatch = await argon2.verify(user.password, oldPassword);
    if (!passwordMatch) {
      res.status(401).json({ message: "Ancien mot de passe incorrect" });
      return;
    }

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
          "Le mot de passe doit contenir un caractère spécial (par exemple, -!@#$%^&*)",
      },
    ];

    for (const requirement of passwordRequirements) {
      if (!requirement.regex.test(newPassword)) {
        res.status(400).json({ message: requirement.message });
        return;
      }
    }

    const hashedPassword = await argon2.hash(newPassword, hashingOptions);
    await usersRepository.updatePassword(userId, hashedPassword);

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const users = {
      id: Number.parseInt(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: req.body.password,
    };

    const firstname = users.firstname;
    const firstnameRequirements = [
      {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,20}$/,
        message:
          "Le prénom doit contenir entre 2 et 20 caractères et ne doit contenir que des lettres",
      },
    ];

    for (const requirement of firstnameRequirements) {
      if (!requirement.regex.test(firstname)) {
        res.status(400).json({ error: requirement.message });
        return;
      }
    }

    const lastname = users.lastname;
    const lastnameRequirements = [
      {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,20}$/,
        message:
          "Le nom doit contenir entre 2 et 20 caractères et ne doit contenir que des lettres",
      },
    ];

    for (const requirement of lastnameRequirements) {
      if (!requirement.regex.test(lastname)) {
        res.status(400).json({ error: requirement.message });
        return;
      }
    }

    if (users.firstname) {
      users.firstname =
        users.firstname.charAt(0).toUpperCase() +
        users.firstname.slice(1).toLowerCase();
    }
    if (users.lastname) {
      users.lastname =
        users.lastname.charAt(0).toUpperCase() +
        users.lastname.slice(1).toLowerCase();
    }

    const affectedRows = await usersRepository.update(
      users.id,
      users.firstname,
      users.lastname,
      users.email,
      users.phone_number,
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
  editPassword,
  edit,
  destroy,
  login,
  browseUsers,
};

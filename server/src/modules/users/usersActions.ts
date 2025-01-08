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

    const insertId = await usersRepository.create(
      newUsers.id,
      newUsers.firstname,
      newUsers.lastname,
      newUsers.email,
      newUsers.password,
    );

    res.status(204).json({ insertId });
  } catch (err) {
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
};

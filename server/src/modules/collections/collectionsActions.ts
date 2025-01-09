import type { RequestHandler } from "express";

import collectionsRepository from "./collectionsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const collections = await collectionsRepository.readAll();

    res.json(collections);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const collectionsId = Number(req.params.id);
    const collections = await collectionsRepository.read(collectionsId);

    if (collections === null) {
      res.status(404);
    } else {
      res.json(collections);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCollections = {
      id: Number(req.params.id),
      name: req.body.name,
    };

    const insertId = await collectionsRepository.create(newCollections.name);

    res.status(204).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const newCollections = {
      id: Number(req.params.id),
      name: req.body.name,
    };

    const affectedRows = await collectionsRepository.create(
      newCollections.name,
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
    const collectionsId = Number(req.params.id);
    await collectionsRepository.delete(collectionsId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
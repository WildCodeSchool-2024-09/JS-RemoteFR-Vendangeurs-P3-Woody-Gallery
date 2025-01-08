import type { RequestHandler } from "express";

import ratingsRepository from "./ratingsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const rating = await ratingsRepository.readAll();

    res.json(rating);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const ratingId = Number(req.params.id);
    const rating = await ratingsRepository.read(ratingId);

    if (rating === null) {
      res.sendStatus(404);
    } else {
      res.json(rating);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newRating = {
      id: Number(req.params.id),
      rating: Number(req.body.rating),
      comment: req.body.comment,
      date: req.body.date,
    };

    const insertId = await ratingsRepository.create(
      newRating.rating,
      newRating.comment,
      newRating.date,
    );

    res.status(204).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const ratingId = Number(req.params.id);
    await ratingsRepository.delete(ratingId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  add,
  destroy,
};

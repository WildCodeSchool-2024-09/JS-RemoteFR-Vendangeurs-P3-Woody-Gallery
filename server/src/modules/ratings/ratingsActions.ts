import type { RequestHandler } from "express";

import usersRepository from "../users/usersRepository";
import ratingsRepository from "./ratingsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    let rating = await ratingsRepository.readAll();

    const badWord = [
      " con ",
      "connard",
      "conar",
      "conard",
      "conare",
      "connare",
      "batard",
      "battar",
      "batar",
      " fdp ",
      "fils de pute",
      "fil de put",
      "fil de pute",
      "fils de put",
      "fils 2 pute",
      "fils2pute",
      "fil2put",
      "fils2put",
      "fil2pute",
      "fils de putain",
      "fils de putin",
      "fils de putun",
      "petasse",
      " pute ",
      " pd ",
      "merde",
      "enculé",
      "enculer",
    ];

    rating = rating.filter((rating) => {
      return !badWord.some((badWord) => rating.comment.includes(badWord));
    });

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
    const { rating, comment, userId } = req.body;

    const users = await usersRepository.readAll();

    if (!users) {
      res.status(404).json({ message: "Utilisateur non trouvé " });
      return;
    }

    const newRating = {
      userId: userId,
      rating: Number(rating),
      comment: comment,
      date: new Date(),
    };

    const insertId = await ratingsRepository.create(
      newRating.rating,
      newRating.comment,
      newRating.userId,
      newRating.date,
    );

    res.status(201).json({ insertId });
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

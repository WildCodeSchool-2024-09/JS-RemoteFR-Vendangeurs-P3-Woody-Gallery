import type { RequestHandler } from "express";
import usersRepository from "../users/usersRepository";
import ordersRepository from "./ordersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const orders = await ordersRepository.readAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const ordersId = Number(req.params.id);
    const orders = await ordersRepository.read(ordersId);
    if (orders == null) {
      res.sendStatus(404);
    } else {
      res.json(orders);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const orders = {
      id: Number(req.params.id),
      date: req.body.date,
      status: req.body.status,
    };
    const affectedRows = await ordersRepository.update(orders);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// ordersActions.ts
const readById: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const orders = await ordersRepository.readByUser(userId);
    if (orders.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(orders);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { userId, articles, total_amount } = req.body;

    const user = await usersRepository.read(userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const newOrder = {
      userId: userId,
      articles: JSON.stringify(articles),
      total_amount: total_amount,
      date: new Date(),
      status: "préparation",
    };

    const insertId = await ordersRepository.create(
      newOrder.userId,
      newOrder.articles,
      newOrder.total_amount,
      newOrder.date,
      newOrder.status,
    );

    res.status(201).json({ insertId });
  } catch (err) {
    console.error("Erreur lors de la création de la commande:", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const ordersId = Number(req.params.id);
    await ordersRepository.delete(ordersId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readById, edit, add, destroy };

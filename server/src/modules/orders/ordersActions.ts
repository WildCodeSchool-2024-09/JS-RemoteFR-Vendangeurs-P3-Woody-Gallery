import type { RequestHandler } from "express";
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
      order_nb: Number(req.body.order_nb),
      date: req.body.date,
      is_done: req.body.is_done,
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

const add: RequestHandler = async (req, res, next) => {
  try {
    const neworders = {
      order_nb: Number(req.body.order_nb),
      date: req.body.date,
      is_done: req.body.is_done,
    };
    const insertId = await ordersRepository.create(neworders);
    res.status(201).json({ insertId });
  } catch (err) {
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

export default { browse, read, edit, add, destroy };
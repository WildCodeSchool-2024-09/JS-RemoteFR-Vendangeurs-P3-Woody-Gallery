import type { RequestHandler } from "express";
import photosRepository from "./photosRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const photos = await photosRepository.readall();
    res.json(photos);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const photosId = Number(req.params.id);
    const photos = await photosRepository.read(photosId);
    if (photos == null) {
      res.sendStatus(404);
    } else {
      res.json(photos);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const photos = {
      id: Number(req.params.id),
      name: req.body.name,
      image: req.file ? `/assets/photos/${req.file.filename}` : req.body.image,
      description: req.body.description,
      format: req.body.format,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
      collection_id: Number(req.body.collection_id),
    };

    const affectedRows = await photosRepository.update(
      photos.id,
      photos.name,
      photos.image,
      photos.description,
      photos.format,
      photos.stock,
      photos.price,
      photos.collection_id,
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

const editIsFavorite: RequestHandler = async (req, res, next) => {
  try {
    const photos = {
      id: Number(req.params.id),
      is_favorite: req.body.is_favorite,
    };
    const affectedRows = await photosRepository.updateIsFavorite(
      photos.is_favorite,
      photos.id,
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

const add: RequestHandler = async (req, res, next) => {
  try {
    const newPhotos = {
      name: req.body.name,
      image: req.file ? `/assets/photos/${req.file.filename}` : req.body.image,
      description: req.body.description,
      format: req.body.format,
      stock: Number(req.body.stock),
      price: req.body.price,
      collection_id: Number(req.body.collection_id),
    };
    const insertId = await photosRepository.create(newPhotos);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const photosId = Number(req.params.id);
    await photosRepository.delete(photosId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  edit,
  editIsFavorite,
  add,
  destroy,
};

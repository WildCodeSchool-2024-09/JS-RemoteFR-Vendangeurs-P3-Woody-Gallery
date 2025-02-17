import type { RequestHandler } from "express";
import type { AddressRow } from ".//addressRepository";
import * as addressRepository from "./addressRepository";

// Ajouter une adresse
export const addAddress: RequestHandler = async (req, res, next) => {
  try {
    const newAddress = req.body;
    // Validation des données
    if (
      !newAddress.street_number ||
      !newAddress.street_name ||
      !newAddress.postal_code ||
      !newAddress.city ||
      !newAddress.country
    ) {
      res.status(400).json({ error: "Données invalides" });
      return;
    }
    const data = await addressRepository.createAddress(newAddress);
    res.status(201).json({ message: "Adresse ajoutée avec succès." });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de l’ajout de l’adresse.",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// Récupérer toutes les adresses
export const getAllAddresses: RequestHandler = async (req, res, next) => {
  try {
    const [rows]: [AddressRow[], unknown] =
      await addressRepository.getAllAddresses();
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Récupérer une adresse par ID
export const getAddressById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id || "0", 10);

    if (!id) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const [rows] = (await addressRepository.getAddressById(id)) as [
      AddressRow[],
      unknown,
    ];
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "Adresse non trouvée." });
    }
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une adresse
export const updateAddress: RequestHandler = async (req, res, next) => {
  try {
    const addressId = Number.parseInt(req.params.id || "0", 10);

    // Vérification si l'ID est valide
    if (!addressId) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const updatedAddress = req.body;

    // Validation des champs requis
    if (
      !updatedAddress.street_number ||
      !updatedAddress.street_name ||
      !updatedAddress.postal_code ||
      !updatedAddress.city ||
      !updatedAddress.country
    ) {
      res.status(400).json({ error: "Données manquantes ou invalides" });
      return;
    }

    await addressRepository.updateAddress(addressId, updatedAddress);
    res.status(200).json({ message: "Adresse mise à jour avec succès." });
  } catch (error) {
    next(error);
  }
};

// Supprimer une adresse
export const deleteAddress: RequestHandler = async (req, res, next) => {
  try {
    const addressId = Number.parseInt(req.params.id || "0", 10);

    if (!addressId) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    await addressRepository.deleteAddress(addressId);
    res.status(200).json({ message: "Adresse supprimée avec succès." });
  } catch (error) {
    next(error);
  }
};

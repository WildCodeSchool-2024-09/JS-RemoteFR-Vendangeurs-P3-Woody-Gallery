import type { Request, Response } from "express";
import * as addressRepository from "./addressRepository";
import type { AddressRow } from "./addressRepository";

// Ajouter une adresse
export const addAddress = async (req: Request, res: Response) => {
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
    await addressRepository.createAddress(newAddress);
    res.status(201).json({ message: "Adresse ajoutée avec succès." });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de l’ajout de l’adresse.",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// Récupérer toutes les adresses
export const getAllAddresses = async (req: Request, res: Response) => {
  try {
    const [rows]: [AddressRow[], unknown] =
      await addressRepository.getAllAddresses();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des adresses.",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// Récupérer une adresse par ID
export const getAddressById = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id || "0", 10);
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
    res.status(500).json({
      error: "Erreur lors de la récupération de l’adresse.",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// Mettre à jour une adresse
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const addressId = Number.parseInt(req.params.id || "0", 10);
    const updatedAddress = req.body;
    await addressRepository.updateAddress(addressId, updatedAddress);
    res.status(200).json({ message: "Adresse mise à jour avec succès." });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour de l’adresse.",
      details: error instanceof Error ? error.message : error,
    });
  }
};

// Supprimer une adresse
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const addressId = Number.parseInt(req.params.id || "0", 10);
    await addressRepository.deleteAddress(addressId);
    res.status(200).json({ message: "Adresse supprimée avec succès." });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression de l’adresse.",
      details: error instanceof Error ? error.message : error,
    });
  }
};

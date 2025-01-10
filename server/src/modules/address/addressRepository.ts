import db from "../../../database/client";

interface Address {
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  country: string;
}

export type AddressRow = Address & { id: number }; // Export du type AddressRow

// Ajouter une adresse
export const createAddress = async (address: Address) => {
  const query = `
        INSERT INTO addresses (street_number, street_name, postal_code, city, country)
        VALUES (?, ?, ?, ?, ?)
    `;
  const values = [
    address.street_number,
    address.street_name,
    address.postal_code,
    address.city,
    address.country,
  ];
  return db.execute(query, values);
};

// Récupérer toutes les adresses
export const getAllAddresses = async (): Promise<[AddressRow[], unknown]> => {
  const query = "SELECT * FROM addresses";
  const [rows, fields] = await db.execute(query);
  return [rows as AddressRow[], fields];
};

// Récupérer une adresse par ID
export const getAddressById = async (
  id: number,
): Promise<[AddressRow[], unknown]> => {
  const query = "SELECT * FROM addresses WHERE id = ?";
  const [rows, fields] = await db.execute(query, [id]);
  return [rows as AddressRow[], fields];
};

// Mettre à jour une adresse
export const updateAddress = async (id: number, address: Address) => {
  const query = `
        UPDATE addresses
        SET street_number = ?, street_name = ?, postal_code = ?, city = ?, country = ?
        WHERE id = ?
    `;
  const values = [
    address.street_number,
    address.street_name,
    address.postal_code,
    address.city,
    address.country,
    id,
  ];
  return db.execute(query, values);
};

// Supprimer une adresse
export const deleteAddress = async (id: number) => {
  const query = "DELETE FROM addresses WHERE id = ?";
  return db.execute(query, [id]);
};

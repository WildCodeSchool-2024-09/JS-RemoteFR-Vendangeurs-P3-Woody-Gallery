import db from "../../../database/client";

interface Address {
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  country: string;
  user_id: number;
}

export type AddressRow = Address & { id: number }; // Export du type AddressRow

// Ajouter une adresse
export const createAddress = async (address: Address) => {
  const query = `
        INSERT INTO addresses (street_number, street_name, postal_code, city, country, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  const values = [
    address.street_number,
    address.street_name,
    address.postal_code,
    address.city,
    address.country,
    address.user_id,
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
  userId: number,
): Promise<[AddressRow[], unknown]> => {
  const query = "SELECT * FROM addresses  WHERE user_id = ?";
  const [rows, fields] = await db.execute(query, [userId]);
  return [rows as AddressRow[], fields];
};

// Mettre à jour une adresse
export const updateAddress = async (id: number, address: Address) => {
  const query = `
        UPDATE addresses
        SET street_number = ?, street_name = ?, postal_code = ?, city = ?, country = ?
        WHERE user_id = ?
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
export const deleteAddress = async (user_id: number) => {
  const query = `
  DELETE addresses 
  FROM addresses 
  INNER JOIN users ON addresses.user_id = users.id 
  WHERE addresses.user_id = ?;
`;
  return db.execute(query, [user_id]);
};

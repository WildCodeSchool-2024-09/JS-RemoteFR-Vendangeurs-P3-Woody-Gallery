import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Users = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  password: string;
};

class UsersRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, firstname, lastname, email, phone_number FROM users",
    );

    return rows as Users[];
  }

  async readAllEmail() {
    const [rows] = await databaseClient.query<Rows>("SELECT email FROM users");

    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, firstname, lastname, email, phone_number, password FROM users WHERE id = ?",
      [id],
    );

    return rows[0] as Users;
  }

  async readAllUsers() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT u.id idUser, u.firstname, u.lastname, u.email, u.phone_number, a.*, r.*
      FROM users u 
      LEFT JOIN addresses a 
      ON u.id = a.user_id
      LEFT JOIN ratings r
      ON u.id = r.user_id
      `,
    );

    const users = rows.map((row) => ({
      id: row.idUser,
      firstname: row.firstname,
      lastname: row.lastname,
      email: row.email,
      phone_number: row.phone_number,
      addresses: {
        street_number: row.street_number,
        street_name: row.street_name,
        postal_code: row.postal_code,
        city: row.city,
        country: row.country,
      },
      ratings: {
        rating: row.rating,
        comment: row.comment,
        date: new Date(row.date).toISOString().slice(0, 10),
      },
    }));

    const currentDate = new Date().toISOString().slice(0, 10);

    return users;
  }

  async create(
    firstname: string,
    lastname: string,
    email: string,
    hashedPassword: string,
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO users (firstname, lastname, email, password) values (?, ?, ?, ?)",
      [firstname, lastname, email, hashedPassword],
    );

    return result.insertId;
  }

  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `
       SELECT u.id, CONCAT(u.firstname,"-", u.lastname) name, u.email, u.password, u.is_admin isAdmin, r.user_id rating
       FROM users u
       LEFT JOIN ratings r
       ON r.user_id = u.id
       WHERE email = ?
       LIMIT 1
       `,
      [email],
    );

    return rows[0];
  }

  async updatePassword(id: number, hashedpassword: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedpassword, id],
    );

    return result.affectedRows;
  }

  async update(
    id: number,
    firstname: string | undefined,
    lastname: string | undefined,
    email: string | undefined,
    phone_number: string | undefined,
    password: string | undefined,
  ) {
    let query = "UPDATE users SET ";
    const values: (string | number)[] = [];

    if (firstname !== undefined) {
      query += "firstname = ?, ";
      values.push(firstname);
    }
    if (lastname !== undefined) {
      query += "lastname = ?, ";
      values.push(lastname);
    }
    if (email !== undefined) {
      query += "email = ?, ";
      values.push(email);
    }
    if (phone_number !== undefined) {
      query += "phone_number = ?, ";
      values.push(phone_number);
    }
    if (password !== undefined) {
      query += "password = ?, ";
      values.push(password);
    }

    query = query.slice(0, -2);

    query += " WHERE id = ?";
    values.push(id);

    const [result] = await databaseClient.query<Result>(query, values);
    return result.affectedRows;
  }

  async delete(id: number) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query("DELETE FROM orders WHERE user_id = ?", [id]);

      await connection.query("DELETE FROM ratings WHERE user_id = ?", [id]);

      await connection.query("DELETE FROM addresses WHERE user_id = ?", [id]);

      const [result] = await connection.query<Result>(
        "DELETE FROM users WHERE id = ?",
        [id],
      );

      await connection.commit();
      return result.affectedRows;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async updateAddressForUser(userId: number, addressId: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET address_id = ? WHERE id = ?",
      [addressId, userId],
    );

    return result.affectedRows;
  }
}

export default new UsersRepository();

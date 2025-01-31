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
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM users WHERE id = ?",
      [id],
    );
    return result.affectedRows;
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

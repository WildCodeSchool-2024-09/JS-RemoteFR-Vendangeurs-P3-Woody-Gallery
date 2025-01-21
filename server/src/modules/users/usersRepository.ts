import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Users = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
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
      "SELECT id, firstname, lastname, email, phone_number FROM users WHERE id = ?",
      [id],
    );

    return rows[0] as Users;
  }

  async create(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO users (firstname, lastname, email, password) values (?, ?, ?, ?)",
      [firstname, lastname, email, password],
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
       `,
      [email],
    );

    return rows[0];
  }

  async updateFirstname(id: number, firstname: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET firstname = ? WHERE id = ?",
      [firstname, id],
    );

    return result.affectedRows;
  }

  async updateLastname(id: number, lastname: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET lastname = ? WHERE id = ?",
      [lastname, id],
    );

    return result.affectedRows;
  }

  async updateEmail(id: number, email: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET email = ? WHERE id = ?",
      [email, id],
    );

    return result.affectedRows;
  }

  async updatePhoneNumber(id: number, phone_number: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET phone_number = ? WHERE id = ?",
      [phone_number, id],
    );

    return result.affectedRows;
  }

  async updatePassword(id: number, password: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE users SET password = ? WHERE id = ?",
      [password, id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM users WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new UsersRepository();

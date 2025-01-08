import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Users = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  password: string;
  is_admin: boolean;
  address_id: number;
  rating_id: number;
};

class UsersRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT firstname, lastname, email, phone_number FROM users",
    );

    return rows as Users[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT firstname, lastname, email, phone_number FROM users WHERE id = ?",
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

  async updateFirstname(id: number, firstname: string) {
    const [result] = await databaseClient.query<Result>(
      "UPTADE users SET firstname = ? WHERE id = ?",
      [firstname, id],
    );

    return result.affectedRows;
  }

  async updateLastname(id: number, lastname: string) {
    const [result] = await databaseClient.query<Result>(
      "UPTADE users SET lastname = ? WHERE id = ?",
      [lastname, id],
    );

    return result.affectedRows;
  }

  async updateEmail(id: number, email: string) {
    const [result] = await databaseClient.query<Result>(
      "UPTADE users SET email = ? WHERE id = ?",
      [email, id],
    );

    return result.affectedRows;
  }

  async updatePhoneNumber(id: number, phone_number: string) {
    const [result] = await databaseClient.query<Result>(
      "UPTADE users SET phone_number = ? WHERE id = ?",
      [phone_number, id],
    );

    return result.affectedRows;
  }

  async updatePassword(id: number, password: string) {
    const [result] = await databaseClient.query<Result>(
      "UPTADE users SET password = ? WHERE id = ?",
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

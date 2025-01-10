import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type RatingsUsers = {
  id: number;
  rating: number;
  comment: string;
  date: string;
  firstname: string;
  lastname: string;
  rating_id: number;
};

class RatingsRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT r.id, u.firstname, u.lastname, r.rating, r.comment, r.date
        FROM ratings r 
        LEFT JOIN users u 
        ON r.id = u.rating_id`,
    );

    return rows as RatingsUsers[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT r.id, u.firstname, u.lastname, r.rating, r.comment, r.date 
      FROM ratings r 
      LEFT JOIN users u 
      ON r.id = u.rating_id
      WHERE r.id = ?`,
      [id],
    );

    return rows[0] as RatingsUsers;
  }

  async create(rating: number, comment: string) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO ratings (rating, comment) VALUES (?,?)",
      [rating, comment],
    );

    return result.insertId;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM ratings WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new RatingsRepository();

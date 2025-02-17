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
        ON r.user_id = u.id
        ORDER BY r.date DESC LIMIT 10`,
    );

    const ratings = rows.map((row) => ({
      id: row.id,
      firstname: row.firstname,
      lastname: row.lastname,
      rating: row.rating,
      comment: row.comment,
      date: new Date(row.date),
      formattedDate: "",
    }));

    const currentDate = new Date();

    for (const rating of ratings) {
      const timeDiff = currentDate.getTime() - rating.date.getTime();
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      const daysDiff = Math.floor(hoursDiff / 24);
      const monthDiff = Math.floor(daysDiff / 31);

      if (hoursDiff < 1) {
        rating.formattedDate = "À l'instant";
      } else if (hoursDiff < 24) {
        rating.formattedDate = `Il y'a ${hoursDiff} heures`;
      } else if (daysDiff < 30) {
        rating.formattedDate = `Il y'a ${daysDiff} jours`;
      } else {
        rating.formattedDate = `Il y'a ${monthDiff} mois`;
      }
    }

    return ratings;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT r.id, u.firstname, u.lastname, r.rating, r.comment, r.date 
      FROM ratings r 
      LEFT JOIN users u 
      ON r.id = u.rating_id
      WHERE r.id = ?
      ORDER BY r.date DESC LIMIT 10`,
      [id],
    );

    return rows[0] as RatingsUsers;
  }

  async create(rating: number, comment: string, userId: number, date: Date) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO ratings (rating, comment, user_id, date) VALUES (?, ?, ?, ?)",
      [rating, comment, userId, date],
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

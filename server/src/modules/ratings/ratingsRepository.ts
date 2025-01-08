import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Ratings = {
  id: number;
  rating: string;
  comment: string;
  date: string;
};

type Users = {
  id: number;
  firstname: string;
  lastname: string;
  rating_id: number;
};

class RatingsRepository {
  async readAll() {
    const [users] = await databaseClient.query<Rows>(
      "SELECT firstname, lastname FROM users",
    );
    const [ratings] = await databaseClient.query<Rows>(
      "SELECT rating, comment, date FROM ratings",
    );

    const rows = users.map((user) => {
      const usersRatings = ratings
        .filter((ratings) => ratings.id === user.rating_id)
        .map((ratings) => ratings);

      return {};
    });
  }
}

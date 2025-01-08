import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Article = {
  name: string;
  image: string;
  price: string;
};

type Collection = {
  name: string;
  article: Article[];
};

class CollectionRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT c.name nameCollection, p.name namePhoto, p.image, p.price
            FROM collections c
            LEFT JOIN photos p 
            ON c.id = p.collection_id`,
    );

    return rows as Collection[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT c.name nameCollection, p.name namePhoto, p.image, p.price
            FROM collections c
            LEFT JOIN photos p 
            ON c.id = p.collection_id
            WHERE id = ?`,
    );

    return rows[0] as Collection[];
  }

  async create(name: string) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO collections (name) VALUES (?)",
      [name],
    );

    return result.insertId;
  }
}

export default new CollectionRepository();

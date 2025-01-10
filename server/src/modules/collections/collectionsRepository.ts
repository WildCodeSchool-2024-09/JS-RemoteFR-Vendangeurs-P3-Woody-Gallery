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
      "SELECT c.id collectionId, c.name collectionName FROM collections c",
    );

    return rows as Collection[];
  }

  async readCollection(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT c.id collectionId, c.name collectionName, p.id photoId, p.name, p.image, p.price
      FROM collections c
      LEFT JOIN photos p
      ON c.id = p.collection_id
      WHERE c.id = ?`,
      [id],
    );

    const collection = rows.map((row) => ({
      collectionId: row.collectionId,
      collectionName: row.collectionName,
      photos: {
        photoId: row.photoId,
        name: row.name,
        image: row.image,
        price: row.price,
      },
    }));

    return collection;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT id collectionId, name collectionName
            FROM collections 
            WHERE id = ?`,
      [id],
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

  async update(id: number, name: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE collections SET name = ? WHERE id = ?",
      [name, id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM collections WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new CollectionRepository();

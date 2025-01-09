import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Photos = {
  id: number;
  name: string;
  image: string;
  description: string;
  format: string;
  stock: number;
  price: number;
  collection_id: number;
};

class PhotosRepository {
  async create(photos: Omit<Photos, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into photos (name, image, description, format, stock, price, collection_id) values (?, ?, ?, ?, ?, ?, ?)",
      [
        photos.name,
        photos.image,
        photos.description,
        photos.format,
        photos.stock,
        photos.price,
        photos.collection_id,
      ],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from photos where id = ?",
      [id],
    );
    return rows[0] as Photos;
  }

  async readall() {
    const [rows] = await databaseClient.query<Rows>("select * from photos");
    return rows as Photos[];
  }

  async update(photos: Photos) {
    const [result] = await databaseClient.query<Result>(
      "update photos set name = ?, image = ?, description = ?, format = ?, stock = ?, price = ?, collection_id = ? where id = ?",
      [
        photos.name,
        photos.image,
        photos.description,
        photos.format,
        photos.stock,
        photos.price,
        photos.collection_id,
        photos.id,
      ],
    );
    return result.affectedRows;
  }

  async updateIsFavorite(is_favorite: boolean, id: number) {
    const [result] = await databaseClient.query<Result>(
      "update photos set is_favorite = ? where id = ?",
      [is_favorite, id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from photos where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new PhotosRepository();

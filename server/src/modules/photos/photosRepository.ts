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

  async update(
    id: number,
    name: string | undefined,
    image: string | undefined,
    description: string | undefined,
    format: string | undefined,
    stock: number | undefined,
    price: number | undefined,
    collection_id: number | undefined,
  ) {
    let query = "UPDATE photos SET ";
    const values: (string | number)[] = [];

    if (name !== undefined) {
      query += "name=?, ";
      values.push(name);
    }
    if (image !== undefined) {
      query += "image=?, ";
      values.push(image);
    }
    if (description !== undefined) {
      query += "description=?, ";
      values.push(description);
    }
    if (format !== undefined) {
      query += "format=?, ";
      values.push(format);
    }
    if (stock !== undefined) {
      query += "stock=?, ";
      values.push(stock);
    }
    if (price !== undefined) {
      query += "price=?, ";
      values.push(price);
    }
    if (collection_id !== undefined) {
      query += "collection_id=?, ";
      values.push(collection_id);
    }

    query = query.slice(0, -2);

    query += " WHERE id = ?";
    values.push(id);

    const [result] = await databaseClient.query<Result>(query, values);
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

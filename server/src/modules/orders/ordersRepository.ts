import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Orders = {
  id: number;
  date: string;
  status: string;
};

class OrdersRepository {
  async create(
    userId: number,
    articles: string,
    total_amount: number,
    date: Date,
    status: string,
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO orders (user_id, articles, total_amount, date, status) VALUES (?, ?, ?, ?, ?)",
      [userId, articles, total_amount, date, status],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from orders where id = ?",
      [id],
    );
    return rows[0] as Orders;
  }

  async readByUser(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT o.id, o.articles, o.total_amount, o.date, o.status
       FROM orders o 
       WHERE o.user_id = ?`,
      [userId],
    );
    return rows as Orders[];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from orders");
    return rows as Orders[];
  }

  async update(orders: Orders) {
    const [result] = await databaseClient.query<Result>(
      "update orders set status = ? where id = ?",
      [orders.status, orders.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from orders where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new OrdersRepository();

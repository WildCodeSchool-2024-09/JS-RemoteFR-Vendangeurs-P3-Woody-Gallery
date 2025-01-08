import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Orders = {
  id: number;
  order_nb: number;
  date: string;
  is_done: boolean;
};

class OrdersRepository {
  // C - CREATE
  async create(orders: Omit<Orders, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into orders (order_nb, date, is_done) values (?, ?, ?)",
      [orders.order_nb, orders.date, orders.is_done],
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

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from orders");
    return rows as Orders[];
  }

  async update(orders: Orders) {
    const [result] = await databaseClient.query<Result>(
      "update program set order_nb = ?, date = ?, is_done = ?",
      [orders.order_nb, orders.date, orders.is_done],
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

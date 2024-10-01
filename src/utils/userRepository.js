import { connectToDatabase } from '../configDatabase.js';

// Connect to database
const db = await connectToDatabase();

class UserRepository {
  constructor() {
    this.db = db;
  }

  async getProducts() {
    const [result] = await this.db.query('SELECT * FROM products');
    return result;
  }

  async createProducts(body) {
    const { id, Name, description, price, image, createdDate } = body;


    const [result] = await db.query(
      'INSERT INTO `users` (`id`, `Name`, `description`, `price`, `image`, `createdDate`) VALUES(?, ?, ?, ?, ?, ?)',
      [
        id,
        Name,
        description,
        price,
        image,
        createdDate
      ]
    );
    return result;
  }

  async updateProducts(body) {
    const { Name, description, price, image, createdDate } = body;

    const [result] = await db.query(
    'UPDATE `products` SET `Name` = ?, `description` = ?, `price` = ?, `image` = ?, `createdDate` = ? WHERE `id` = ?',
    [
      Name,
      description,
      price,
      image,
      createdDate,
    ]
    );
    return result;
  }

  async deleteProducts(id) {
    const [result] = await db.query('DELETE FROM `products` WHERE `id` =?', [id]);
    return result;
  }
}

export default new UserRepository();
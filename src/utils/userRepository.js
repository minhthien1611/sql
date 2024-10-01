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
    const { id, Name, description, price, image } = body;

    const [result] = await db.query(
    'UPDATE `products` SET (`id`, `Name`, `description`, `price`, `image`) VALUES(?, ?, ?, ?, ?, ?)',
    [
      id,
      Name,
      description,
      price,
      image
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
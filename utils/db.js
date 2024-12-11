import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const uri = `mongodb://${host}:${port}`;

    const dbName = process.env.DB_DATABASE || 'files_manager';

    this.isConnected = false;

    (async () => {
      this.client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await this.client.connect();
      this.db = this.client.db(dbName);
      this.users = this.db.collection('users');
      this.files = this.db.collection('files');
      await this.db.command({ ping: 1 });
      this.isConnected = true;
    })();
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    return this.users.countDocuments();
  }

  async nbFiles() {
    return this.files.countDocuments();
  }

  async getUser(args) {
    return this.users.findOne(args);
  }

  async addUser(user) {
    const exists = await this.getUser({ email: user.email });
    if (exists) {
      throw new Error('Already exist');
    }

    const insertedUser = await this.users.insertOne(user);
    return insertedUser.insertedId;
  }

  async getFile(args) {
    return this.files.findOne(args);
  }

  async addFile(file) {
    const insertedFile = await this.files.insertOne(file);
    return insertedFile.insertedId;
  }
}

const dbClient = new DBClient();
export default dbClient;
import { MongoClient } from 'mongodb';

/**
 * @class DBClient
 * @classdesc A client for interacting with a MongoDB database.
 * 
 * @constructor
 * Initializes a new instance of the DBClient class.
 * 
 * @property {boolean} isConnected - Indicates whether the client is connected to the database.
 * @property {MongoClient} client - The MongoDB client instance.
 * @property {Db} db - The MongoDB database instance.
 * @property {Collection} users - The users collection.
 * @property {Collection} files - The files collection.
 * 
 * @method isAlive
 * @description Checks if the client is connected to the database.
 * @returns {boolean} True if the client is connected, otherwise false.
 * 
 * @method nbUsers
 * @description Gets the number of users in the database.
 * @returns {Promise<number>} The number of users.
 * 
 * @method nbFiles
 * @description Gets the number of files in the database.
 * @returns {Promise<number>} The number of files.
 * 
 * @method getUser
 * @description Retrieves a user from the database based on the provided arguments.
 * @param {Object} args - The arguments to find the user.
 * @returns {Promise<Object|null>} The user document, or null if not found.
 * 
 * @method addUser
 * @description Adds a new user to the database.
 * @param {Object} user - The user document to add.
 * @returns {Promise<ObjectId>} The ID of the inserted user.
 * @throws {Error} If the user already exists.
 * 
 * @method getFile
 * @description Retrieves a file from the database based on the provided arguments.
 * @param {Object} args - The arguments to find the file.
 * @returns {Promise<Object|null>} The file document, or null if not found.
 * 
 * @method addFile
 * @description Adds a new file to the database.
 * @param {Object} file - The file document to add.
 * @returns {Promise<ObjectId>} The ID of the inserted file.
 */
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

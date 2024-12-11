import { MongoClient } from 'mongodb';

/**
 * DBClient class for managing MongoDB connections and operations.
 */
class DBClient {
    /**
     * Creates an instance of DBClient.
     * Initializes the MongoDB connection using environment variables or default values.
     */
    constructor() {}

    /**
     * Checks if MongoDB is connected.
     * @returns {boolean} True if MongoDB is connected, otherwise false.
     */
    isAlive() {}

    /**
     * Gets the number of documents in the "users" collection.
     * @returns {Promise<number>} The number of documents in the "users" collection.
     */
    async nbUsers() {}

    /**
     * Gets the number of documents in the "files" collection.
     * @returns {Promise<number>} The number of documents in the "files" collection.
     */
    async nbFiles() {}
}
  constructor() {
    const host = process.env.DB_HOST || 'localhost'; // Default to localhost
    const port = process.env.DB_PORT || 27017; // Default to port 27017
    const database = process.env.DB_DATABASE || 'files_manager'; // Default to files_manager

    // MongoDB connection URI
    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.databaseName = database;

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        this.db = this.client.db(this.databaseName);
        console.log('Connected to MongoDB successfully.');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
      });
  }

  // Check if MongoDB is connected
  isAlive() {
    return this.client && this.client.isConnected();
  }

  // Get the number of documents in the "users" collection
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Error counting users:', err);
      return 0;
    }
  }

  // Get the number of documents in the "files" collection
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error counting files:', err);
      return 0;
    }
  }
}

// Export a single instance of the DBClient
const dbClient = new DBClient();
export default dbClient;

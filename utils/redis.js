import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * RedisClient class to interact with Redis.
 */
class RedisClient {
  /**
     * Creates an instance of RedisClient.
     * Initializes the Redis client and sets up the connection error handling.
     */
<<<<<<< HEAD
    constructor() {}

    /**
     * Checks if the Redis client is connected.
     * @returns {boolean} True if the client is connected, false otherwise.
     */
    isAlive() {}

    /**
     * Retrieves the value associated with the given key from Redis.
     * @param {string} key - The key to retrieve.
     * @returns {Promise<string>} The value associated with the key.
     */
    async get(key) {}

    /**
     * Sets a value in Redis with an expiration time.
     * @param {string} key - The key to set.
     * @param {string} value - The value to set.
     * @param {number} duration - The expiration time in seconds.
     * @returns {Promise<void>}
     */
    async set(key, value, duration) {}

    /**
     * Deletes the value associated with the given key from Redis.
     * @param {string} key - The key to delete.
     * @returns {Promise<void>}
     */
    async delete(key) {}
}
  constructor() {
    const client = createClient();
    client.on('error', (err) => {
      console.log('Redis connection error:', err);
      this.isClientConnected = false;
    });

    this.client = client;
    this.isClientConnected = true;
  }

  isAlive() {
    return this.isClientConnected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, value, 'EX', duration);
  }

  async delete(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
=======
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (err) {
      console.error('Error getting key from Redis:', err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.setAsync(key, value, 'EX', duration);
    } catch (err) {
      console.error('Error setting key in Redis:', err);
    }
  }

  async del(key) {
    try {
      await this.delAsync(key);
    } catch (err) {
      console.error('Error deleting key from Redis:', err);
    }
>>>>>>> d3853bef3dbe1639b25ab767ed2e515438761fb6
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;

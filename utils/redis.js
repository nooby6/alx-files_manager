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
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;

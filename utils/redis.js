import redis from 'redis';
import { promisify } from 'util';

/**
 * RedisClient class to interact with a Redis database.
 */
class RedisClient {
    /**
     * Creates an instance of RedisClient.
     * Initializes the Redis client and sets up promisified methods for get, set, and del.
     */

    /**
     * Checks if the Redis client is connected.
     * @returns {boolean} True if the client is connected, false otherwise.
     */
    isAlive() {
        // ...
    }

    /**
     * Retrieves the value associated with the given key from Redis.
     * @param {string} key - The key to retrieve.
     * @returns {Promise<string|null>} The value associated with the key, or null if an error occurs.
     */
    async get(key) {
        // ...
    }

    /**
     * Sets a key-value pair in Redis with an expiration time.
     * @param {string} key - The key to set.
     * @param {string} value - The value to set.
     * @param {number} duration - The expiration time in seconds.
     * @returns {Promise<void>} A promise that resolves when the key is set.
     */
    async set(key, value, duration) {
        // ...
    }

    /**
     * Deletes the key-value pair associated with the given key from Redis.
     * @param {string} key - The key to delete.
     * @returns {Promise<void>} A promise that resolves when the key is deleted.
     */
    async del(key) {
        // ...
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
    }
}

const redisClient = new RedisClient();
export default redisClient;

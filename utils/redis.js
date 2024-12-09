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

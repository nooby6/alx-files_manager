import { ObjectId } from 'mongodb';
import redisClient from './redis';
import dbClient from './db';

/**
 * Retrieves the session user based on the provided token.
 *
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} The user object if the token is valid.
 * @throws {Error} If the token is missing or invalid.
 */
export default async function getSessionUser(token) {
  if (!token) {
    throw new Error('Unauthorized');
  }

  const userID = await redisClient.get(`auth_${token}`);
  if (!userID) {
    throw new Error('Unauthorized');
  }

  const user = await dbClient.getUser({ _id: new ObjectId(userID) });
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

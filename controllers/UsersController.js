const dbClient = require('../utils/db');
const crypto = require('crypto');

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) return res.status(400).json({ error: 'Missing email' });
        if (!password) return res.status(400).json({ error: 'Missing password' });

        const userExists = await dbClient.findUserByEmail(email);
        if (userExists) return res.status(400).json({ error: 'Already exist' });

        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
        const newUser = await dbClient.createUser(email, hashedPassword);

        res.status(201).json({ id: newUser._id, email });
    }

    static async getMe(req, res) {
        const token = req.header('X-Token');
        const userId = await redisClient.get(`auth_${token}`);

        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const user = await dbClient.findUserById(userId);
        if (!user) return res.status(401).json({ error: 'Unauthorized' });

        res.status(200).json({ id: user._id, email: user.email });
    }
}

module.exports = UsersController;

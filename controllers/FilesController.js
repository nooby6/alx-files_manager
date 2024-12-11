const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class FilesController {
    static async postUpload(req, res) {
        const token = req.header('X-Token');
        const userId = await redisClient.get(`auth_${token}`);

        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const { name, type, parentId = 0, isPublic = false, data } = req.body;

        if (!name) return res.status(400).json({ error: 'Missing name' });
        if (!['folder', 'file', 'image'].includes(type)) {
            return res.status(400).json({ error: 'Missing type' });
        }
        if (type !== 'folder' && !data) return res.status(400).json({ error: 'Missing data' });

        const parentFile = parentId ? await dbClient.findFileById(parentId) : null;
        if (parentId && (!parentFile || parentFile.type !== 'folder')) {
            return res.status(400).json({ error: 'Parent is not a folder' });
        }

        let localPath;
        if (type !== 'folder') {
            const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
            await fs.mkdir(folderPath, { recursive: true });
            localPath = `${folderPath}/${uuidv4()}`;
            await fs.writeFile(localPath, Buffer.from(data, 'base64'));
        }

        const newFile = await dbClient.createFile({
            userId,
            name,
            type,
            isPublic,
            parentId,
            localPath,
        });

        res.status(201).json(newFile);
    }
}

module.exports = FilesController;

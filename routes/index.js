const express = require('express');
const statsController = require('../controllers/AppController');
/**
 * @fileoverview This file sets up the routes for the application.
 * 
 * @requires ../controllers/UsersController
 */
const usersController = require('../controllers/UsersController');
const authController = require('../controllers/AuthController');
const filesController = require('../controllers/FilesController');

const router = express.Router();

router.get('/status', statsController.getStatus);
router.get('/stats', statsController.getStats);
router.post('/users', usersController.postNew);
router.get('/users/me', usersController.getMe);
router.get('/connect', authController.getConnect);
router.get('/disconnect', authController.getDisconnect);
router.post('/files', filesController.postUpload);
router.get('/files', filesController.getIndex);
router.get('/files/:id', filesController.getShow);

module.exports = router;
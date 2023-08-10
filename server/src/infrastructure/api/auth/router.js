const express = require('express');
const router = express.Router();
const DI = require('../DI.api')
const existsAuthMiddleware = require('../../helpers/existsAuthMiddleware')

module.exports = () => {
	const controller = DI.resolve('authController')
	router.post('/auth/register', controller.registration.bind(controller))
	router.post('/auth/login', controller.login.bind(controller))
	router.post('/auth/logout',existsAuthMiddleware, controller.logout.bind(controller))
	return router;
};

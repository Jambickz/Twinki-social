const express = require('express');
const router = express.Router();
const DI = require('../DI.api')

module.exports = () => {
	const controller = DI.resolve('authController')
	router.post('/auth/register', controller.registration.bind(controller))
	return router;
};

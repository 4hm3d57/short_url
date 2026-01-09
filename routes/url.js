const express = require('express');
const route = express.Router();
const { short_url } = require('../controllers/url');


route.post('/shortener', short_url);

module.exports = route;

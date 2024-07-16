const Schema = require('mongoose').Schema;

const db = require('../config/db');

const Egyesulet = db.model('Egyesulet', {
    name: String,
    year: Number,
    president: String
});

module.exports = Egyesulet;
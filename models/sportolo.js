const Schema = require('mongoose').Schema;

const db = require('../config/db');

const Sportolo = db.model('Sportolo', {
    name: String,
    year: Number,
    sport: String,
    _egyesulete: {
        type: Schema.Types.ObjectId,
        ref: 'Egyesulet'
    }
});

module.exports = Sportolo;
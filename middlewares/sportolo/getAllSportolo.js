/**
 * getAllSportoloMW:
 * adatbázisból kinyeri a sportolóakt, és elhelyezi őket a res.locals-ba
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const SportoloModel = requireOption(objectrepository, 'SportoloModel');

    return function(req, res, next) {
        if (typeof res.locals.egyesulet === 'undefined') {
            return next();
        }

        SportoloModel.find({ _egyesulete: res.locals.egyesulet._id }).exec()
            .then(sportolok => {
                res.locals.sportolok = sportolok;
                return next();
            })
            .catch(err => next(err));
    };
};


/*
module.exports = (objectrepository) => {
    return (req, res, next) => {
        res.locals.sportolok = 
        [
            {
                name: 'Balázsi Bálint',
                year: 2004,
                sport: 'Szertorna'
            },
            {
                name: 'Nagy Attila',
                year: 1994,
                sport: 'Labdarúgás'
            },
            {
                name: 'Kiss Anna',
                year: 2010,
                sport: 'Kézilabda'
            }
        ]
        return next();
    };
};
*/
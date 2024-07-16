/**
 *getAllEgyesuletMW:
 *adatbázisból kinyeri az egyesületeket, és elhelyezi őket a res.locals-ba
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
    const EgyesuletModel = requireOption(objectrepository, 'EgyesuletModel');

    return function(req, res, next) {
        EgyesuletModel.find({})
            .then(egyesuletek => {
                res.locals.egyesuletek = egyesuletek;
                return next();
            })
            .catch(err => next(err));
    };
};

/*
module.exports = (objectrepository) => {
    return (req, res, next) => {
        res.locals.egyesuletek =
            [
                {
                    name: 'Győri Atlétikai Club',
                    year: 1919,
                    president: 'Borkai Zsolt'
                },
                {
                    name: 'Ferencvárosi Torna Club',
                    year: 1899,
                    president: 'Kubatov Gábor'
                },
                {
                    name: 'Debreceni VSC',
                    year: 1902,
                    president: 'Szabó Péter'
                }
            ]
        return next();
    };
}; */

//module.exports = getAllEgyesulet;
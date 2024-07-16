/**
 * getSportoloMW:
 * az url-ben érkező sportolo_id alapján kinyeri az adatbázisból az adott sportolót
 *  - ha nincs, akkor redirect a /sportolo-ra
 *  - ha van, akkor elmenti a res.locals.egyesulet-be és next-et hív
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const SportoloModel = requireOption(objectrepository, 'SportoloModel');

    return function(req, res, next) {
        SportoloModel.findOne({ _id: req.params.sportoloid })
            .then(sportolo => {
                if (!sportolo) {
                    return next(new Error('Sportolo not found'));
                }

                res.locals.sportolo = sportolo;
                return next();
            })
            .catch(err => next(err));
    };
};
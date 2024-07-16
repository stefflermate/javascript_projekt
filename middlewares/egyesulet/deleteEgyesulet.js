/**
 * deleteEgyesuletMW:
 * ellenőrzi, hogy létezik-e adat az egyesülethez a res.locals.egyesulet-ben
 *  - ha nem, akkor next-et hívunk
 *  - ha igen, akkor törli az adatokat az adatbázisból és next-et hívunk
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.egyesulet === 'undefined') {
            return next();
        }

        res.locals.egyesulet.deleteOne()
            .then(() => {
                return res.redirect('/egyesulet');
            })
            .catch(err => next(err));
    };
};
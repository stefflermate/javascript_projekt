/**
 * deleteSportoloMW:
 * ellenőrzi, hogy létezik-e adat az sportolóhoz a res.locals.sportolo-ban
 *  - ha nem, akkor next-et hívunk
 *  - ha igen, akkor törli az adatokat az adatbázisból és next-et hívunk
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const SportoloModel = requireOption(objectrepository, 'SportoloModel');

    return function(req, res, next) {
        if (typeof res.locals.sportolo === 'undefined') {
            return next();
        }

        SportoloModel.deleteOne({ _id: res.locals.sportolo._id })
            .then(() => {
                return res.redirect(`/sportolo/${res.locals.egyesulet._id}`);
            })
            .catch(err => next(err));
    };
};
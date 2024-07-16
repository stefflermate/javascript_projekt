/**
 * saveEgyesuletMW:
 * ha nincs POST, ha nem érkezett post adat, akkor hívjunk next-et
 *  -redirect(/egyesulet/new)
 *  -elmentem adatbázisba és utána a felhasznalót átirányítom a /egyesulet url-re
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const EgyesuletModel = requireOption(objectrepository, 'EgyesuletModel');

    return function(req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.year === 'undefined' ||
            typeof req.body.president === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.egyesulet === 'undefined') {
            res.locals.egyesulet = new EgyesuletModel();
        }

        res.locals.egyesulet.name = req.body.name;
        res.locals.egyesulet.year = req.body.year;
        res.locals.egyesulet.president = req.body.president;

        res.locals.egyesulet.save()
            .then(() => res.redirect('/egyesulet'))
            .catch(err => next(err));
    };
};

/**
 * saveSportoloMW:
 * ha nincs POST, ha nem érkezett post adat, akkor hívjunk next-et
 *  -redirect(/sportolo/new)
 *  -elmentem adatbázisba és utána a felhasznalót átirányítom a /sportolo url-re
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const SportoloModel = requireOption(objectrepository, 'SportoloModel');

    return function(req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.year === 'undefined' ||
            typeof req.body.sport === 'undefined' ||
            typeof res.locals.egyesulet === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.sportolo === 'undefined') {
            res.locals.sportolo = new SportoloModel();
        }

        if (Number.isNaN(parseInt(req.body.year, 10))) {
            return next(new Error('Az évet számmal kell megadni!'));
        }

        res.locals.sportolo.name = req.body.name;
        res.locals.sportolo.year = parseInt(req.body.year, 10);
        res.locals.sportolo.sport = req.body.sport;
        res.locals.sportolo._egyesulete = res.locals.egyesulet._id;

        res.locals.sportolo.save()
            .then(() => {
                return res.redirect(`/sportolo/${res.locals.egyesulet._id}`);
            })
            .catch(err => next(err));
    };
};
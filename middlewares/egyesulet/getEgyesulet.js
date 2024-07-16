/**
 * getEgyesuletMW:
 * az url-ben érkező egyesulet_id alapján kinyeri az adatbázisból az adott egyesületet
 *  - ha nincs, akkor redirect a /egyesulet-re 
 *  - ha van, akkor elmenti a res.locals.egyesulet-be és next-et hív
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const EgyesuletModel = requireOption(objectrepository, 'EgyesuletModel');

    return function(req, res, next) {
        EgyesuletModel.findOne({ _id: req.params.egyesuletid })
            .then(egyesulet => {
                if (!egyesulet) {
                    return res.redirect('/egyesulet');
                }
    
                res.locals.egyesulet = egyesulet;
                return next();
            })
            .catch(err => next(err));
    };
};

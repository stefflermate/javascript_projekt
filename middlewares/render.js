/**
 * renderMW:
 * html-t generál és küld vissza
 * @param objectrepository 
 * @returns {function (*, *, *): *}
 */

const requireOption = require('./requireOption');

    module.exports = (objectrepository, viewName) => {
        return function(req, res) {
            res.render(viewName);
        };
    };

    //res.render(viewName, res.locals);
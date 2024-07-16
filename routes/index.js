/*
const db = require('../config/db');
const EgyesuletModel = require('../models/egyesulet');

const newEgyesulet = new EgyesuletModel();
newEgyesulet.name = "GYAC";
newEgyesulet.year = 1890;
newEgyesulet.president = "Borkai Zsolt";
newEgyesulet.save((err) => {
        console.log(err);
});

return;
*/


// Routing struktúra

// Egyesülethez:
const getAllEgyesuletMW = require("../middlewares/egyesulet/getAllEgyesulet");
const saveEgyesuletMW = require("../middlewares/egyesulet/saveEgyesulet");
const getEgyesuletMW = require("../middlewares/egyesulet/getEgyesulet");
const deleteEgyesuletMW = require("../middlewares/egyesulet/deleteEgyesulet");


// Sportolóhoz:
const getAllSportoloMW = require("../middlewares/sportolo/getAllSportolo");
const saveSportoloMW = require("../middlewares/sportolo/saveSportolo");
const getSportoloMW = require("../middlewares/sportolo/getSportolo");
const deleteSportoloMW = require("../middlewares/sportolo/deleteSportolo");


// Render:
const renderMW = require("../middlewares/render");

// Modellek:
const EgyesuletModel = require('../models/egyesulet');
const SportoloModel = require('../models/sportolo');

module.exports = function(app) {
        const objRepo = {
                EgyesuletModel: EgyesuletModel,
                SportoloModel: SportoloModel
        };

// Feliratkoztatások:
        app.get('/egyesulet',
                getAllEgyesuletMW(objRepo),
                renderMW(objRepo, "egyesulet"));

        app.use('/egyesulet/new',
                saveEgyesuletMW(objRepo),
                renderMW(objRepo, 'uj_egyesulet'));

        app.use('/egyesulet/edit/:egyesuletid',
                getEgyesuletMW(objRepo),
                saveEgyesuletMW(objRepo),
                renderMW(objRepo, "uj_egyesulet"));

        app.get("/egyesulet/del/:egyesuletid",
                getEgyesuletMW(objRepo),
                deleteEgyesuletMW(objRepo));


        app.get('/sportolo/:egyesuletid',
                getEgyesuletMW(objRepo),
                getAllSportoloMW(objRepo),
                renderMW(objRepo, "sportolo"));

        app.use('/sportolo/:egyesuletid/new',
                getEgyesuletMW(objRepo),
                saveSportoloMW(objRepo),
                renderMW(objRepo, "uj_sportolo"));

        app.use('/sportolo/:egyesuletid/edit/:sportoloid',
                getEgyesuletMW(objRepo),
                getSportoloMW(objRepo),
                saveSportoloMW(objRepo),
                renderMW(objRepo, "uj_sportolo"));

        app.get("/sportolo/:egyesuletid/del/:sportoloid",
                getEgyesuletMW(objRepo),        
                getSportoloMW(objRepo),
                deleteSportoloMW(objRepo),
                renderMW(objRepo, 'uj_sportolo'));
};
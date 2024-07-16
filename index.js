const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//app.use('/egyesulet', express.static('static'));
app.use(express.static(path.join(__dirname, 'static')));

require('./routes/index')(app);

const server = app.listen(3000, function () {});
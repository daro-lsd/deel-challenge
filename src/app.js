const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { sequelize } = require('./model')

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use(bodyParser.json());
app.use('/contracts', require('./routes/contracts'));
app.use('/jobs', require('./routes/jobs'));
app.use('/balances', require('./routes/balances'));
app.use('/admin', require('./routes/admin'));

module.exports = app;

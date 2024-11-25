const {Sequelize} = require('sequelize');
const {config} = require('../config/config');
const setupModels = require('../db/models');

const USER=encodeURIComponent(config.dbUser);
const PASSWORD=encodeURIComponent(config.dbPassword);
URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true, // para mostrar los logs
});

setupModels(sequelize);
module.exports = sequelize;

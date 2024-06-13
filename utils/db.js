require('dotenv').config();
const mysql2 = require('mysql2');
// import mysql2 from 'mysql2'; // Needed to fix sequelize issues with WebPack
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.NAME_DATABASE,  process.env.USER_DATABASE, process.env.PASS_DATABASE, {
  host: process.env.HOST_DATABASE,
  dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
  dialect: 'mysql', // Loại cơ sở dữ liệu bạn đang sử dụng (postgres, mysql, sqlite, ...)
});
module.exports = {
    sequelize
}
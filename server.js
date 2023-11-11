"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var models_1 = require("./app/models");
var product_route_1 = require("./app/routers/product.route");
var login_route_1 = require("./app/routers/login.route");
var order_route_1 = require("./app/routers/order.route");
// const app:Application=require("../dist/server");
var passport = require('passport'); // Import Passport.js
require("./app/config/passport.config");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(passport.initialize()); // Initialize Passport.js
models_1.default.sequelize.sync({ force: true }); // remove it because we make the change and we don't need it dsad
app.use('/api/v1/products', product_route_1.default);
app.use('/api/v1/login', login_route_1.default);
app.use('/api/v1/orders', order_route_1.default);
var Port = process.env.PORT || 3000;
app.listen(Port, function () {
    console.log("Server is running on ".concat(Port));
});

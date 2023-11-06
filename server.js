"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var models_1 = require("./app/models");
var product_route_1 = require("./app/routers/product.route");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
models_1.default.sequelize.sync();
app.use('/api/v1/products', product_route_1.default);
var Port = process.env.PORT || 3000;
app.listen(Port, function () {
    console.log("Server is running on ".concat(Port));
});

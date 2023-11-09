"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCart = exports.productReviews = exports.productRelated = exports.productInfo = void 0;
var models_1 = require("../models");
var sequelize_1 = require("sequelize");
var Product = models_1.default.product;
var Reviews = models_1.default.review;
var User = models_1.default.user;
var Order = models_1.default.order;
var OrderItem = models_1.default.order_item;
// get the product information
var productInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, count, productInfo_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                productId = req.params.productId;
                console.log("Received product ID: ".concat(productId));
                return [4 /*yield*/, Product.findByPk(productId)];
            case 1:
                product = _a.sent();
                return [4 /*yield*/, Reviews.findAndCountAll({
                        where: { product_id: productId },
                    })];
            case 2:
                count = (_a.sent()).count;
                if (product) {
                    productInfo_1 = __assign(__assign({}, product.toJSON()), { ratingCount: count });
                    res.status(200).json({ products: productInfo_1 });
                }
                else {
                    res.status(404).json({
                        message: "product not found",
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json({ error: "Internal Server Error", details: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.productInfo = productInfo;
var productRelated = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var randomProducts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Product.findAll({
                        order: models_1.default.sequelize.random(),
                        limit: 5,
                    })];
            case 1:
                randomProducts = _a.sent();
                if (randomProducts.length > 0) {
                    res.status(200).json({ products: randomProducts });
                }
                else {
                    res.status(404).json({ message: "No products found" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({ error: "Internal Server Error", details: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.productRelated = productRelated;
// get all the reviews of an product
var productReviews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, reviews, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = req.params.productId;
                return [4 /*yield*/, Reviews.findAll({
                        where: { product_id: productId },
                        include: [
                            {
                                model: User,
                                attributes: [
                                    [
                                        sequelize_1.Sequelize.fn("CONCAT", sequelize_1.Sequelize.col("first_name"), " ", sequelize_1.Sequelize.col("last_name")),
                                        "full_name",
                                    ],
                                ],
                            },
                        ],
                    })];
            case 1:
                reviews = _a.sent();
                if (reviews.length > 0) {
                    res.status(200).json({ reviews: reviews });
                }
                else {
                    res
                        .status(404)
                        .json({ message: "There is no reviews for this product ".concat(productId) });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json({ error: "Internal Server Error", details: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.productReviews = productReviews;
// create an order if it doesn't exist and if it's status not in_cart
var addProductToCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, orderItemQuantity, productId, product, cart, order_item, orderItems, newTotalPrice, _i, orderItems_1, item, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                user = req.user;
                console.log("User ID:", user.id);
                orderItemQuantity = req.body.orderItemQuantity;
                productId = req.params.productId;
                return [4 /*yield*/, Product.findByPk(productId)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: "Product not found" })];
                }
                // Check if there is enough stock available
                if (product.stock_quantity < orderItemQuantity) {
                    return [2 /*return*/, res.status(400).json({ message: "Insufficient stock" })];
                }
                return [4 /*yield*/, Order.findOne({
                        where: { user_id: user.id, status: "in_cart" },
                    })];
            case 2:
                cart = _a.sent();
                if (!!cart) return [3 /*break*/, 4];
                return [4 /*yield*/, Order.create({
                        user_id: user.id,
                        address_id: null,
                        status: "in_cart",
                        total_price: 0,
                        tax: 2,
                    })];
            case 3:
                // If no "in-cart" order exists, create a new one
                cart = _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, OrderItem.findOne({
                    where: { productID: productId, orderID: cart.id },
                })];
            case 5:
                order_item = _a.sent();
                if (!order_item) return [3 /*break*/, 7];
                // If the order item already exists, update its quantity and sub-total
                order_item.quantity += orderItemQuantity;
                order_item.sub_total =
                    (product.price - product.price * (product.discount / 100)) *
                        order_item.quantity;
                return [4 /*yield*/, order_item.save()];
            case 6:
                _a.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, OrderItem.create({
                    quantity: orderItemQuantity,
                    orderID: cart.id,
                    productID: productId,
                    sub_total: (product.price - product.price * (product.discount / 100)) *
                        orderItemQuantity,
                })];
            case 8:
                // If the order item doesn't exist, create a new one and save it to the database
                order_item = _a.sent();
                _a.label = 9;
            case 9:
                // Deduct the orderItemQuantity from the product's stock
                product.stock_quantity -= orderItemQuantity;
                return [4 /*yield*/, product.save()];
            case 10:
                _a.sent();
                return [4 /*yield*/, OrderItem.findAll({
                        where: { orderID: cart.id },
                    })];
            case 11:
                orderItems = _a.sent();
                newTotalPrice = 0;
                for (_i = 0, orderItems_1 = orderItems; _i < orderItems_1.length; _i++) {
                    item = orderItems_1[_i];
                    newTotalPrice += parseFloat(item.sub_total);
                    console.log(newTotalPrice);
                }
                cart.total_price = newTotalPrice;
                return [4 /*yield*/, cart.save()];
            case 12:
                _a.sent();
                console.log(cart.total_price);
                console.log("The product added as an order item to the cart");
                res.status(201).json({
                    message: "The product added as an order item to the cart", cart: cart
                });
                return [3 /*break*/, 14];
            case 13:
                error_4 = _a.sent();
                console.log(error_4);
                res.status(500).json({ error: "Internal Server Error", details: error_4 });
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.addProductToCart = addProductToCart;

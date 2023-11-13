"use strict";
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
exports.deleteOrderItem = exports.changeOrderStatusAndPutAddress = void 0;
var models_1 = require("../models");
var Order = models_1.default.order;
var User = models_1.default.user;
var OrderItem = models_1.default.order_item;
var Product = models_1.default.product;
var changeOrderStatusAndPutAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, orderId, _a, addressId, orderItems, order, _loop_1, _i, orderItems_1, incomingOrderItem, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                user = req.user;
                orderId = req.params.orderId;
                _a = req.body, addressId = _a.addressId, orderItems = _a.orderItems;
                return [4 /*yield*/, Order.findOne({
                        where: { user_id: user.id, id: orderId },
                        include: OrderItem,
                    })];
            case 1:
                order = _b.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: "Order not found" })];
                }
                // Check if an address is provided
                if (addressId) {
                    // Update the order's address ID
                    order.address_id = addressId;
                    // Set the order status to "paid"
                    order.status = "paid";
                }
                if (!(orderItems && Array.isArray(orderItems))) return [3 /*break*/, 5];
                // Update the order status to "placed"
                order.status = "placed";
                _loop_1 = function (incomingOrderItem) {
                    var existingOrderItem, product, quantityDifference, updatedStockQuantity, updatedTotalPrice;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                existingOrderItem = order.order_items.find(function (item) { return item.id === incomingOrderItem.id; });
                                if (!existingOrderItem) {
                                    console.log("Order item with ID ".concat(incomingOrderItem.id, " not found in the order."));
                                    return [2 /*return*/, "continue"];
                                }
                                if (!(incomingOrderItem.quantity !== existingOrderItem.quantity)) return [3 /*break*/, 5];
                                return [4 /*yield*/, Product.findByPk(existingOrderItem.productID)];
                            case 1:
                                product = _c.sent();
                                if (!product) {
                                    console.log("Product not found for order item ID ".concat(existingOrderItem.id));
                                    return [2 /*return*/, "continue"];
                                }
                                quantityDifference = incomingOrderItem.quantity - existingOrderItem.quantity;
                                updatedStockQuantity = product.stock_quantity - quantityDifference;
                                return [4 /*yield*/, product.update({ stock_quantity: updatedStockQuantity })];
                            case 2:
                                _c.sent();
                                // Update order item quantity
                                existingOrderItem.quantity = incomingOrderItem.quantity;
                                // Calculate the new sub_total for the order item
                                existingOrderItem.sub_total =
                                    existingOrderItem.quantity * product.price;
                                // Save the order item changes
                                return [4 /*yield*/, existingOrderItem.save()];
                            case 3:
                                // Save the order item changes
                                _c.sent();
                                updatedTotalPrice = order.order_items.reduce(function (total, item) { return total + item.sub_total; }, 0);
                                // Update order total_price
                                return [4 /*yield*/, order.update({ total_price: updatedTotalPrice })];
                            case 4:
                                // Update order total_price
                                _c.sent();
                                _c.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, orderItems_1 = orderItems;
                _b.label = 2;
            case 2:
                if (!(_i < orderItems_1.length)) return [3 /*break*/, 5];
                incomingOrderItem = orderItems_1[_i];
                return [5 /*yield**/, _loop_1(incomingOrderItem)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: 
            // Save the order changes
            return [4 /*yield*/, order.save()];
            case 6:
                // Save the order changes
                _b.sent();
                res
                    .status(200)
                    .json({ message: "Order placed successfully", order: order });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ error: "Internal Server Error", details: error_1 });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.changeOrderStatusAndPutAddress = changeOrderStatusAndPutAddress;
//////////////////////////////////////////////////////////////////////////////////
var deleteOrderItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderItemId, user, orderItem, associatedOrder, removedSubTotal, removedQuantity, associatedProduct, updatedStockQuantity, remainingOrderItems, updatedTotalPrice, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                orderItemId = req.params.orderItemId;
                user = req.user;
                return [4 /*yield*/, OrderItem.findByPk(orderItemId, {
                        include: Product,
                    })];
            case 1:
                orderItem = _a.sent();
                console.log(orderItem.product);
                if (!orderItem || !orderItem.product) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "Order item or associated product not found" })];
                }
                return [4 /*yield*/, Order.findByPk(orderItem.orderID)];
            case 2:
                associatedOrder = _a.sent();
                // Check if the order item belongs to the authenticated user
                if (!associatedOrder || associatedOrder.user_id !== user.id) {
                    return [2 /*return*/, res.status(403).json({
                            message: "Unauthorized: Order item does not belong to the user",
                        })];
                }
                removedSubTotal = orderItem.sub_total;
                removedQuantity = orderItem.quantity;
                console.log(removedQuantity);
                associatedProduct = orderItem.product;
                if (!associatedProduct) return [3 /*break*/, 4];
                updatedStockQuantity = associatedProduct.stock_quantity + removedQuantity;
                return [4 /*yield*/, associatedProduct.update({ stock_quantity: updatedStockQuantity })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: 
            // Remove the order item from the order item table
            return [4 /*yield*/, orderItem.destroy()];
            case 5:
                // Remove the order item from the order item table
                _a.sent();
                return [4 /*yield*/, OrderItem.count({
                        where: {
                            orderID: associatedOrder.id,
                        },
                    })];
            case 6:
                remainingOrderItems = _a.sent();
                if (!(remainingOrderItems === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, associatedOrder.destroy()];
            case 7:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Order and all order items removed successfully",
                    })];
            case 8:
                updatedTotalPrice = associatedOrder.total_price - removedSubTotal;
                return [4 /*yield*/, associatedOrder.update({ total_price: updatedTotalPrice })];
            case 9:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Order item removed successfully" })];
            case 10:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({ error: "Internal Server Error", details: error_2 });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.deleteOrderItem = deleteOrderItem;
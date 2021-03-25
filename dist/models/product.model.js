"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    cuantity: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        required: true,
        default: 0
    },
    prices: Number,
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category'
    }
});
exports.default = mongoose_1.model('Product', productSchema);

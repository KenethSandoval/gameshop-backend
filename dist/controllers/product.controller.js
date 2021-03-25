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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedProduct = exports.updateProduct = exports.listProduct = exports.createProduct = void 0;
const response_1 = require("../network/response");
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category } = req.body;
    try {
        if (!(name && description && price && category)) {
            return response_1.error(res, 'Missing data something like name, description, category or price', 400);
        }
        const product = new product_model_1.default(Object.assign({}, req.body));
        const categoryExists = yield category_model_1.default.findById({ _id: category });
        if (!categoryExists) {
            return response_1.error(res, "Category not found", 404);
        }
        const productExists = yield product_model_1.default.findOne({ name });
        if (productExists) {
            return response_1.error(res, `Product with ${name} already exists`, 400);
        }
        yield category_model_1.default.findByIdAndUpdate(category, { $inc: { cuantity_products: 1 } }, { new: true });
        yield product.save();
        return response_1.success(res, { message: '', data: product }, 201);
    }
    catch (err) {
        response_1.error(res, err.message, 500);
    }
});
exports.createProduct = createProduct;
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.find()
            .populate('category', 'name');
        if (product.length === 0) {
            return response_1.error(res, "No categories", 404);
        }
        else {
            return response_1.success(res, { message: '', data: product }, 200);
        }
    }
    catch (err) {
        return response_1.error(res, err.message, 500);
    }
});
exports.listProduct = listProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, category } = req.body;
    try {
        //que exista un id en el body
        if (_id) {
            const productFound = yield product_model_1.default.findById(_id);
            if (!productFound)
                response_1.error(res, 'Product not found', 404);
            const changeProduct = Object.assign(Object.assign({}, req.body), { _id });
            //actualiza el producto
            const productUpdated = yield product_model_1.default.findByIdAndUpdate(_id, changeProduct, { new: true });
            return response_1.success(res, { message: '', data: productUpdated }, 200);
        }
        return response_1.error(res, 'Missing data something like _id', 400);
    }
    catch (err) {
        return response_1.error(res, err.message, 500);
    }
});
exports.updateProduct = updateProduct;
const deletedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const ProductFound = yield product_model_1.default.findById(_id);
        if (!ProductFound)
            return response_1.error(res, 'Category not found', 404);
        yield product_model_1.default.findByIdAndDelete(_id);
        return response_1.success(res, { message: 'Deleted' }, 200);
    }
    catch (err) {
        return response_1.error(res, err.message, 500);
    }
});
exports.deletedProduct = deletedProduct;

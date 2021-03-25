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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.listCategory = void 0;
const response_1 = require("../network/response");
const category_model_1 = __importDefault(require("../models/category.model"));
const listCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enterprise = yield category_model_1.default.find();
        if (enterprise.length === 0) {
            return response_1.error(res, "No categories", 404);
        }
        else {
            return response_1.success(res, { message: '', data: enterprise }, 200);
        }
    }
    catch (err) {
        return response_1.error(res, err.message, 500);
    }
});
exports.listCategory = listCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (name) {
        try {
            const categoryExists = yield category_model_1.default.findOne({ name });
            if (categoryExists) {
                return response_1.error(res, `Category with name ${name} already exists`, 400);
            }
            const categoryAdd = new category_model_1.default(Object.assign({}, req.body));
            yield categoryAdd.save();
            return response_1.success(res, { message: '', data: categoryAdd }, 201);
        }
        catch (err) {
            return response_1.error(res, `Error: ${err.message}`, 500);
        }
    }
    else {
        return response_1.error(res, 'Enter all data', 400);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const categoryFound = yield category_model_1.default.findById(_id);
        if (!categoryFound) {
            return response_1.error(res, 'Category not found', 404);
        }
        const categoryUpdate = yield category_model_1.default.findByIdAndUpdate(_id, req.body, { new: true });
        return response_1.success(res, { message: '', data: categoryUpdate }, 200);
    }
    catch (err) {
        return response_1.error(res, err.message, 500);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const categoryFound = yield category_model_1.default.findById(_id);
        if (!categoryFound) {
            return response_1.error(res, 'Category not found', 404);
        }
        yield category_model_1.default.findByIdAndDelete(_id);
        return response_1.success(res, { message: 'Deleted' }, 200);
    }
    catch (err) {
        return response_1.error(res, err.message, 500);
    }
});
exports.deleteCategory = deleteCategory;

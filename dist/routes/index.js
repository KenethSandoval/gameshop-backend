"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = express_1.Router();
router.route('/category')
    .get(controllers_1.listCategory)
    .post(controllers_1.createCategory)
    .put(controllers_1.updateCategory)
    .delete(controllers_1.deleteCategory);
router.route('/product')
    .post(controllers_1.createProduct)
    .get(controllers_1.listProduct)
    .put(controllers_1.updateProduct)
    .delete(controllers_1.deletedProduct);
router.route('/user')
    .post(controllers_1.createUser);
exports.default = router;

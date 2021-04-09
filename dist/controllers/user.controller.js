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
exports.createUser = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = __importDefault(require("../models/user.model"));
const response_1 = require("../network/response");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existEmail = yield user_model_1.default.findOne({ email });
        //que el email no este en uso
        if (existEmail)
            response_1.error(res, 'El email ya esta en uso', 400);
        const user = new user_model_1.default(req.body);
        //encriptamos contraseña 
        const salt = bcryptjs_1.genSaltSync();
        user.password = bcryptjs_1.hashSync(password, salt);
        yield user.save();
        return response_1.success(res, { message: '', data: user }, 200);
    }
    catch (err) {
        console.log(err);
        response_1.error(res, 'Error inesperado', 500);
    }
});
exports.createUser = createUser;

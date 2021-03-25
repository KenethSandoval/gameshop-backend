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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.config();
const router_1 = __importDefault(require("./network/router"));
const initializeMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGOURI || 'mongodb://localhost:27017/gameshop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Database: \x1b[0;34m', 'online');
        startApp();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
const startApp = () => {
    try {
        const app = express_1.default();
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(body_parser_1.default.json());
        app.use(cors_1.default());
        app.use(morgan_1.default('dev'));
        router_1.default(app);
        app.listen(process.env.PORT, () => console.log(`Server running ${process.env.PORT}`));
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
initializeMongo();

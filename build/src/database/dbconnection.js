"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_config_1 = __importDefault(require("../../dotenv.config"));
let db;
if (process.env.NODE_ENV === "test") {
    db = new pg_1.Pool({
        port: parseInt(dotenv_config_1.default.pgport),
        host: dotenv_config_1.default.pghost,
        user: dotenv_config_1.default.pguser,
        password: dotenv_config_1.default.pgpassword,
        database: dotenv_config_1.default.pgdb_test,
    });
}
else {
    db = new pg_1.Pool({
        port: parseInt(dotenv_config_1.default.pgport),
        host: dotenv_config_1.default.pghost,
        user: dotenv_config_1.default.pguser,
        password: dotenv_config_1.default.pgpassword,
        database: dotenv_config_1.default.pgdb,
    });
}
exports.default = db;

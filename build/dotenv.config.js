"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, pgPORT, pgHOST, pgUSER, pgPASSWORD, pgDB, pgDB_TEST, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET, } = process.env;
exports.default = {
    port: PORT,
    pghost: pgHOST,
    pgpassword: pgPASSWORD,
    pgport: pgPORT,
    pguser: pgUSER,
    pgdb: pgDB,
    pgdb_test: pgDB_TEST,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    webtoken: TOKEN_SECRET,
};

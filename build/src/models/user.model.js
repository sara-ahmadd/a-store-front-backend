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
const dbconnection_1 = __importDefault(require("../database/dbconnection"));
const dotenv_config_1 = __importDefault(require("../../dotenv.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//setting the function that does hashing to the password.
//we will need hashing in creating new user and updating an existing user.
const hashingPassword = (password) => {
    const salt = parseInt(dotenv_config_1.default.salt);
    return bcrypt_1.default.hashSync(`${password}${dotenv_config_1.default.pepper}`, salt);
};
//create class for user.
class UserModel {
    //function to create new user.
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //connect to DB.
                const connection = yield dbconnection_1.default.connect();
                const sql = `INSERT INTO users (email,firstname,lastname,password)
        VALUES($1, $2, $3, $4) RETURNING id,email,firstname,lastname`;
                //send request(query).
                const result = yield connection.query(sql, [
                    u.email,
                    u.firstname,
                    u.lastname,
                    hashingPassword(u.password),
                ]);
                //release connection with DB.
                connection.release();
                //return the response.
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot create that user :${(u.email, u.firstname, u.lastname)}`);
            }
        });
    }
    //func to update user.
    updateOne(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //connect to DB.
                const connection = yield dbconnection_1.default.connect();
                const sql = `UPDATE users SET email=$1, 
  firstName=$2,lastName=$3,password=$4 WHERE id=$5 RETURNING id,email,
  firstName,lastName`;
                //send request(query).
                const result = yield connection.query(sql, [
                    u.email,
                    u.firstname,
                    u.lastname,
                    hashingPassword(u.password),
                    u.id,
                ]);
                //release connection with DB.
                connection.release();
                //return the response.
                return result.rows[0];
            }
            catch (error) {
                console.log("error in updating the user.");
            }
        });
    }
    //func to get all users.
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `SELECT id,email,firstName,lastName
    FROM users`;
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (err) {
                throw new Error("error in getting all users");
            }
        });
    }
    //func to get a user.
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //connect to db.
                const connection = yield dbconnection_1.default.connect();
                //send query.
                const sql = `SELECT id,email,firstName,lastName FROM users 
    WHERE id=($1)`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                //return the result.
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`error in getting that user with id:${id}`);
            }
        });
    }
    //func to delete user.
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `DELETE FROM users WHERE
    id=($1)RETURNING id,email,firstName,lastName`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`error in deleting that user with id:${id}`);
            }
        });
    }
    //function to authenticate user.
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `SELECT password FROM users
    WHERE email=($1)`;
                const result = yield connection.query(sql, [email]);
                if (result.rows.length) {
                    const { password: hashingPassword } = result.rows[0];
                    const ifValid = bcrypt_1.default.compareSync(`${password}${dotenv_config_1.default.pepper}`, hashingPassword);
                    if (ifValid === true) {
                        const sql = `SELECT id,email,firstname,lastname FROM users 
        WHERE email=($1)`;
                        const userData = yield connection.query(sql, [email]);
                        return userData.rows[0];
                    }
                }
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error("This User Is Unvalid");
            }
        });
    }
}
exports.default = UserModel;

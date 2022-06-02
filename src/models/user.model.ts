import User from "../types/user.type";
import db from "../database/dbconnection";
import config from "../../dotenv.config";
import bcrypt from "bcrypt";

//setting the function that does hashing to the password.
//we will need hashing in creating new user and updating an existing user.
const hashingPassword = (password: string) => {
  const salt = parseInt(config.salt as string);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
//create class for user.
class UserModel {
  //function to create new user.
  async create(u: User): Promise<User> {
    try {
      //connect to DB.
      const connection = await db.connect();
      const sql = `INSERT INTO users (email,firstname,lastname,password)
        VALUES($1, $2, $3, $4) RETURNING id,email,firstname,lastname`;
      //send request(query).
      const result = await connection.query(sql, [
        u.email,
        u.firstname,
        u.lastname,
        hashingPassword(u.password),
      ]);
      //release connection with DB.
      connection.release();
      //return the response.
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `cannot create that user :${(u.email, u.firstname, u.lastname)}`
      );
    }
  }
  //func to update user.
  async updateOne(u: User): Promise<User | undefined> {
    try {
      //connect to DB.
      const connection = await db.connect();
      const sql = `UPDATE users SET email=$1, 
  firstName=$2,lastName=$3,password=$4 WHERE id=$5 RETURNING id,email,
  firstName,lastName`;
      //send request(query).
      const result = await connection.query(sql, [
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
    } catch (error) {
      console.log("error in updating the user.");
    }
  }
  //func to get all users.
  async getAllUsers(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id,email,firstName,lastName
    FROM users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error("error in getting all users");
    }
  }

  //func to get a user.
  async getOne(id: number): Promise<User> {
    try {
      //connect to db.
      const connection = await db.connect();
      //send query.
      const sql = `SELECT id,email,firstName,lastName FROM users 
    WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      //return the result.
      return result.rows[0];
    } catch (err) {
      throw new Error(`error in getting that user with id:${id}`);
    }
  }
  //func to delete user.
  async deleteOne(id: number): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users WHERE
    id=($1)RETURNING id,email,firstName,lastName`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`error in deleting that user with id:${id}`);
    }
  }
  //function to authenticate user.
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = `SELECT password FROM users
    WHERE email=($1)`;
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashingPassword } = result.rows[0];
        const ifValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashingPassword
        );
        if (ifValid === true) {
          const sql = `SELECT id,email,firstname,lastname FROM users 
        WHERE email=($1)`;
          const userData = await connection.query(sql, [email]);
          return userData.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error("This User Is Unvalid");
    }
  }
}

export default UserModel;

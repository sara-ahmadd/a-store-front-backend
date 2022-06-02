import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  pgPORT,
  pgHOST,
  pgUSER,
  pgPASSWORD,
  pgDB,
  pgDB_TEST,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
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

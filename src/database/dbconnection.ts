import { Pool } from "pg";
import config from "../../dotenv.config";

let db: Pool;
if (process.env.NODE_ENV === "test") {
  db = new Pool({
    port: parseInt(config.pgport as string) as number,
    host: config.pghost,
    user: config.pguser,
    password: config.pgpassword,
    database: config.pgdb_test,
  });
} else {
  db = new Pool({
    port: parseInt(config.pgport as string) as number,
    host: config.pghost,
    user: config.pguser,
    password: config.pgpassword,
    database: config.pgdb,
  });
}
export default db;

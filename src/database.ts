import { Pool } from "pg";
require("dotenv").config();

// Create a new pool instance
const { POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DB_DEV } =
  process.env;

const client = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: 5432, // default PostgreSQL port
  database: POSTGRES_DB_DEV,
});

// Test the connection
client.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    // Perform database operations here
    // ...
    // Don't forget to release the client when you're done
    done();
  }
});

// Export the client for other modules to use
export default client;

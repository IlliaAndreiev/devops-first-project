const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = 3000;

const client = new Client({
  host: "postgres",
  user: "devops",
  password: "devops",
  database: "devopsdb",
  port: 5432,
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("PostgreSQL connection error", err));

app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()");
    
    res.json({
      message: "Hello DevOps from CD",
      database_time: result.rows[0].now
    });
  } catch (err) {
    console.error(err);

    res.status(500).send("Database error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
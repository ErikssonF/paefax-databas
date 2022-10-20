let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "users.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO users (username, password) VALUES (?,?)";
  db.run(insert, ["Frege", "password"]);
};

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite user database.");
    db.run(
      `CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            password TEXT            
            )`,
      (err) => {
        if (err) {
          console.error("User table already created");
        } else {
          fillDatabase(db);
        }
      }
    );
  }
});

module.exports = db;
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./test.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
})

db.serialize(function () {
  //create channel table
  // db.run("CREATE TABLE IF NOT EXISTS channel (name TEXT, )");
  //create donor table
  db.run("CREATE TABLE IF NOT EXISTS donor (full_name TEXT, ssn TEXT, preferred_channel TEXT, expected_donation INTEGER)");
  // Create records
  let stmt = db.prepare("INSERT INTO donor(full_name, ssn, preferred_channel, expected_donation) VALUES (?,?,?,?)");
  stmt.run("Jacob Smith", "123123123", "email", 700);
  stmt.run("Emma Williams","111111111", "email", 200);
  stmt.run("Emily Brown", "2223232323", "LinkedIn", 400);
  stmt.run("Michael Jones", "43215151646", "Instagram", 150);
  stmt.run("Alexander Miller", "54353542345", "Instagram", 650);
  stmt.finalize();
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.')
})


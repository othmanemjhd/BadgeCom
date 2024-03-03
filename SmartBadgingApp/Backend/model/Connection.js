import mysql from "mysql"

export const db = mysql.createConnection({
        host: "localhost",
        user:"root",
        password :"root",
        database:"badge"

})

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

export default db;

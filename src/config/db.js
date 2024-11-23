import mysql from 'mysql2'
import { config } from "dotenv";
config();

let connection;

try {
  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  console.log('🐬 Connect to DB');

} catch (error) {
  console.error("Error al conectar con la base de datos");
}

export default connection;

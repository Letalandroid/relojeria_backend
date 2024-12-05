import connection from "../config/db.js";

export const verify_email = async (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Usuarios WHERE Correo=?", [email],
      (error, results) => {
        if (error) {
          console.error(error);
          return reject(false);
        }
        if (results.length === 0) {
          return resolve(false);
        }
        return resolve(results);
      }
    );
  });
};

import connection from "../config/db.js";

export const newCodeVerify = async (email, code) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO VerificationCodes (email, code) VALUES (?,?)", [email, code],
      (error,) => {
        if (error) {
          console.error(error);
          return reject(false);
        }

        return resolve('Add code');
      }
    );
  });
};
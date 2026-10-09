const db = require("../config/db");

const getAllMessages = (callback) => {
  const query = `
    SELECT id, name, email, subject, message, is_read, created_at
    FROM contacts
    ORDER BY created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const createMessage = (data, callback) => {
  const { name, email, subject, message } = data;
  const query = `
    INSERT INTO contacts (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [name, email, subject, message], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  getAllMessages,
  createMessage,
};

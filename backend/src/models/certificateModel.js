const db = require("../config/db");

const getAllCertificates = (callback) => {
    const query = "SELECT * FROM certificates ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

const getCertificateById = (id, callback) => {
    db.query("SELECT * FROM certificates WHERE id = ?", [id], (err, results) => {
        callback(err, results && results[0]);
    });
};

const createCertificate = (data, callback) => {
    const { title, issuer, date, credential_id, verification_url } = data;
    db.query(
        "INSERT INTO certificates (title, issuer, date, credential_id, verification_url) VALUES (?, ?, ?, ?, ?)",
        [title, issuer, date, credential_id, verification_url],
        callback,
    );
};

const updateCertificate = (id, data, callback) => {
    const { title, issuer, date, credential_id, verification_url } = data;
    db.query(
        "UPDATE certificates SET title = ?, issuer = ?, date = ?, credential_id = ?, verification_url = ? WHERE id = ?",
        [title, issuer, date, credential_id, verification_url, id],
        callback,
    );
};

const deleteCertificate = (id, callback) => {
    db.query("DELETE FROM certificates WHERE id = ?", [id], callback);
};

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate,
};
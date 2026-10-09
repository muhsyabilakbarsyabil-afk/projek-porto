const express = require("express");
const router = express.Router();

const {
  getCertificates,
  getCertificateDetail,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

router.get("/", getCertificates);
router.get("/:id", getCertificateDetail);
router.post("/", createCertificate);
router.put("/:id", updateCertificate);
router.delete("/:id", deleteCertificate);

module.exports = router;
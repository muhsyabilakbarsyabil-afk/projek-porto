const projectModel = require("../models/projectModel");

const getProjects = (req, res) => {
  projectModel.getAllProjects((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data proyek",
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: "Data proyek berhasil diambil",
      data: results,
    });
  });
};

const getProject = (req, res) => {
  projectModel.getProjectById(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data proyek",
        error: err.message,
      });
    }

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Proyek tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Data proyek berhasil diambil",
      data: result,
    });
  });
};

module.exports = {
  getProjects,
  getProject,
};
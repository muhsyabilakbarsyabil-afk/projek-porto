const dashboardModel = require("../models/dashboard");

const getDashboardStats = (req, res) => {
  dashboardModel.getDashboardStats((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data statistik dashboard",
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: "Data statistik dashboard berhasil diambil",
      data: results,
    });
  });
};

module.exports = {
  getDashboardStats,
};
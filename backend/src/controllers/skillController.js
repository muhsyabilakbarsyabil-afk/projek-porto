const skillModel = require("../models/skillModel");

const getSkills = (req, res) => {
    skillModel.getAllSkills((err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data skill",
                error: err.message,
            });
        }

        res.json({
            success: true,
            message: "Data skill berhasil diambil",
            data: results,
        });
    });
};

// ==========================================
// GET SKILL DETAIL
// ==========================================
const getSkillDetail = (req, res) => {
    const { id } = req.params;

    skillModel.getSkillById(id, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil detail skill",
                error: err.message,
            });
        }

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Skill tidak ditemukan",
            });
        }

        res.json({
            success: true,
            message: "Detail skill berhasil diambil",
            data: result,
        });
    });
};

// ==========================================
// CREATE SKILL
// ==========================================
const createSkill = (req, res) => {
    const {
        skill_group_id,
        name,
        level,
        percentage
    } = req.body;

    if (!skill_group_id || !name || !level) {
        return res.status(400).json({
            success: false,
            message: "Grup skill, nama, dan level wajib diisi",
        });
    }

    const skillData = {
        skill_group_id: Number(skill_group_id),
        name,
        level,
        percentage: Number(percentage) || 0,
    };

    skillModel.createSkill(skillData, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkan skill baru",
                error: err.message,
            });
        }

        res.status(201).json({
            success: true,
            message: "Skill baru berhasil ditambahkan",
            data: {
                id: result.insertId,
                ...skillData,
            },
        });
    });
};

// ==========================================
// UPDATE SKILL
// ==========================================
const updateSkill = (req, res) => {
    const { id } = req.params;
    const {
        skill_group_id,
        name,
        level,
        percentage
    } = req.body;

    if (!skill_group_id || !name || !level) {
        return res.status(400).json({
            success: false,
            message: "Grup skill, nama, dan level wajib diisi",
        });
    }

    skillModel.getSkillById(id, (err, existing) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal memeriksa data skill",
                error: err.message,
            });
        }

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Skill yang akan diubah tidak ditemukan",
            });
        }

        const skillData = {
            skill_group_id: Number(skill_group_id),
            name,
            level,
            percentage: Number(percentage) || 0,
        };

        skillModel.updateSkill(id, skillData, (updateErr) => {
            if (updateErr) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal memperbarui data skill",
                    error: updateErr.message,
                });
            }

            res.json({
                success: true,
                message: "Data skill berhasil diperbarui",
                data: {
                    id: Number(id),
                    ...skillData,
                },
            });
        });
    });
};

// ==========================================
// DELETE SKILL
// ==========================================
const deleteSkill = (req, res) => {
    const { id } = req.params;

    skillModel.getSkillById(id, (err, existing) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal memeriksa data skill",
                error: err.message,
            });
        }

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Skill yang akan dihapus tidak ditemukan",
            });
        }

        skillModel.deleteSkill(id, (deleteErr) => {
            if (deleteErr) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal menghapus data skill",
                    error: deleteErr.message,
                });
            }

            res.json({
                success: true,
                message: "Data skill berhasil dihapus",
            });
        });
    });
};

// ==========================================
// GET ALL SKILL GROUPS
// ==========================================
const getSkillGroups = (req, res) => {
    skillModel.getAllSkillGroups((err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil kategori skill",
                error: err.message,
            });
        }

        res.json({
            success: true,
            message: "Kategori skill berhasil diambil",
            data: results,
        });
    });
};

// ==========================================
// CREATE SKILL GROUP
// ==========================================
const createSkillGroup = (req, res) => {
    const { title, icon } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Nama kategori skill wajib diisi",
        });
    }

    skillModel.createSkillGroup(title, icon, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal menambahkan kategori skill",
                error: err.message,
            });
        }

        res.status(201).json({
            success: true,
            message: "Kategori skill berhasil ditambahkan",
            data: {
                id: result.insertId,
                title,
                icon: icon || "⚡",
            },
        });
    });
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
    getSkills,
    getSkillDetail,
    createSkill,
    updateSkill,
    deleteSkill,
    getSkillGroups,
    createSkillGroup,
};

const db = require("../config/db");

const getAllSkills = (callback) => {
  const query = `
    SELECT
      skills.id,
      skills.skill_group_id,
      skills.name,
      skills.level,
      skills.percentage,
      skill_groups.group_name AS group_title,
      '💡' AS group_icon
    FROM skills
    JOIN skill_groups ON skills.skill_group_id = skill_groups.id
    ORDER BY skill_groups.id ASC, skills.id ASC
  `;
  db.query(query, (err, results) => {
    callback(err, results);
  });
};

const getSkillById = (id, callback) => {
  db.query("SELECT * FROM skills WHERE id = ?", [id], (err, results) => callback(err, results && results[0]));
};

const createSkill = (data, callback) => {
  const { skill_group_id, name, level, percentage } = data;
  db.query(
    "INSERT INTO skills (skill_group_id, name, level, percentage) VALUES (?, ?, ?, ?)",
    [skill_group_id, name, level, percentage],
    callback,
  );
};

const updateSkill = (id, data, callback) => {
  const { skill_group_id, name, level, percentage } = data;
  db.query(
    "UPDATE skills SET skill_group_id = ?, name = ?, level = ?, percentage = ? WHERE id = ?",
    [skill_group_id, name, level, percentage, id],
    callback,
  );
};

const deleteSkill = (id, callback) => {
  db.query("DELETE FROM skills WHERE id = ?", [id], callback);
};

const getAllSkillGroups = (callback) => {
  db.query("SELECT id, group_name AS title, '💡' AS icon FROM skill_groups ORDER BY id", callback);
};

const createSkillGroup = (title, icon, callback) => {
  db.query("INSERT INTO skill_groups (group_name) VALUES (?)", [title], callback);
};

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  getAllSkillGroups,
  createSkillGroup,
};
const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");

router.get("/", skillController.getSkills);
router.get("/groups", skillController.getSkillGroups);
router.post("/groups", skillController.createSkillGroup);
router.get("/:id", skillController.getSkillDetail);
router.post("/", skillController.createSkill);
router.put("/:id", skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill);

module.exports = router;
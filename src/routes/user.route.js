const express = require('express');

const router = express.Router();

const controller = require("../controllers/user.controller");

router.post("/", controller.createUser);
router.get("/:id", controller.findUser);
router.put("/", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
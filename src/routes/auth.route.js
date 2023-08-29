const express = require('express');

const router = express.Router();

const controller = require("../controllers/auth.controller");
const authJwt = require("../middlewares/authJwt")

router.get("/", authJwt.verifyToken, controller.getAuth);
router.get("/user", authJwt.verifyToken, controller.getUser);
router.post("/", controller.signin);

module.exports = router;
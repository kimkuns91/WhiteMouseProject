const express = require('express');

const router = express.Router();

const controller = require("../controllers/post.controller");

router.post("/", controller.createPost);
router.get("/:id", controller.findPost);
router.get("/", controller.findAllPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);
router.put("/views/:id", controller.postViewUp);

module.exports = router;
const express = require('express');
const multer = require('multer');

const router = express.Router();

const controller = require("../controllers/upload.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single('image'), controller.uploadsImg);
router.delete('/:objectKey', controller.deleteImg);

module.exports = router;
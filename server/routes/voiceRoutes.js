const express = require("express");
const router = express.Router();
const multer = require("multer");
const voiceController = require("../controllers/voiceController");

const upload = multer({ dest: "uploads/" });

router.post(
	"/clone-and-tts",
	upload.single("voiceFile"),
	voiceController.cloneAndSpeak
);

module.exports = router;

const fs = require("fs");
const PlayHT = require("playht");

exports.cloneAndSpeak = async (req, res) => {
	try {
		const voiceFile = req.file;
		const text = req.body.text;

		if (!voiceFile || !text) {
			return res
				.status(400)
				.json({ message: "Missing voice file or text" });
		}

		// Clone the voice
		const fileBlob = fs.readFileSync(voiceFile.path);
		const cloneName = `clone_${Date.now()}`;
		const clonedVoice = await PlayHT.clone(cloneName, fileBlob, "male");

		// Generate speech with cloned voice
		const generated = await PlayHT.generate(text, {
			voiceId: clonedVoice.id,
			voiceEngine: clonedVoice.voiceEngine,
		});

		// Clean up the uploaded file
		fs.unlinkSync(voiceFile.path);

		res.json({ audioUrl: generated.audioUrl });
	} catch (error) {
		console.error("Error in voice cloning and speech generation:", error);
		res.status(500).json({
			message: "An error occurred during processing",
		});
	}
};

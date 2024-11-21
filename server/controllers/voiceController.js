const fs = require("fs");
const PlayHT = require("playht");

async function removeExistingClones() {
	try {
		const voices = await PlayHT.listVoices({ isCloned: true });
		for (const voice of voices) {
			await PlayHT.deleteClone(voice.id);
			console.log(`Deleted cloned voice: ${voice.id}`);
		}
	} catch (error) {
		console.error("Error removing existing clones:", error);
	}
}

exports.cloneAndSpeak = async (req, res) => {
	try {
		const voiceFile = req.file;
		const text = req.body.text;

		if (!voiceFile || !text) {
			return res
				.status(400)
				.json({ message: "Missing voice file or text" });
		}

		// Remove existing clones before creating a new one
		await removeExistingClones();

		// Clone the voice
		const fileBlob = fs.readFileSync(voiceFile.path);
		const cloneName = `clone_${Date.now()}`;
		const clonedVoice = await PlayHT.clone(cloneName, fileBlob);

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

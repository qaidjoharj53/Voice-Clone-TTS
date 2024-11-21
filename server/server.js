const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const PlayHT = require("playht");
const voiceRoutes = require("./routes/voiceRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize PlayHT SDK
PlayHT.init({
	apiKey: process.env.PLAYHT_API_KEY,
	userId: process.env.PLAYHT_USER_ID,
	defaultVoiceEngine: "Play3.0-mini",
});

app.use(cors());
app.use(express.json());

app.use("/api/voice", voiceRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

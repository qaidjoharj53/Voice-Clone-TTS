const express = require("express");
const path = require("path");
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

app.get("/", (req, res) => {
	res.send("Hello from the server!");
});

// Production setup
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

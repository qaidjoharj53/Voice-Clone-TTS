import React, { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase URL or Anon Key");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function VoiceClonerApp() {
	const [voiceFile, setVoiceFile] = useState<File | null>(null);
	const [text, setText] = useState("");
	const [generatedAudioUrl, setGeneratedAudioUrl] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				setError(
					"Oops, this file is too big! Please try again with a file up to 5 MB."
				);
				if (fileInputRef.current) fileInputRef.current.value = "";
			} else if (!file.type.startsWith("audio/")) {
				setError(
					"Oops, this file format is not supported! Please try again with an audio file."
				);
				if (fileInputRef.current) fileInputRef.current.value = "";
			} else {
				setVoiceFile(file);
				setError("");
			}
		}
	};

	const handleTextChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		if (event.target.value.length <= 500) {
			setText(event.target.value);
			setError("");
		} else {
			setError("Text must be 500 characters or less.");
		}
	};

	const handleGenerate = async () => {
		if (!voiceFile) {
			setError("Please upload a voice file first.");
			return;
		}
		if (!text) {
			setError("Please enter some text.");
			return;
		}
		setIsLoading(true);
		setError("");

		try {
			// Upload voice file to Supabase storage
			const { data: uploadData, error: uploadError } =
				await supabase.storage
					.from("voice-files")
					.upload(
						`original/${Date.now()}-${voiceFile.name}`,
						voiceFile
					);

			if (uploadError) throw uploadError;

			// Here you would typically call your backend API to process the audio
			// For this example, we'll just simulate a delay
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Simulate getting a generated audio file URL
			const fakeGeneratedUrl = `https://example.com/generated-audio-${Date.now()}.mp3`;
			setGeneratedAudioUrl(fakeGeneratedUrl);
		} catch (err) {
			setError(
				"An error occurred while processing your request. Please try again."
			);
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-2xl font-semibold">
								Voice Cloner App
							</h1>
						</div>
						<div className="divide-y divide-gray-200">
							<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
								<div className="flex flex-col">
									<label className="leading-loose">
										Upload Voice File (up to 5 MB)
									</label>
									<input
										type="file"
										onChange={handleFileChange}
										ref={fileInputRef}
										accept="audio/*"
										className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
									/>
								</div>
								<div className="flex flex-col">
									<label className="leading-loose">
										Enter Text (up to 500 characters)
									</label>
									<textarea
										value={text}
										onChange={handleTextChange}
										className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
										rows={4}
										maxLength={500}></textarea>
								</div>
								{error && (
									<p className="text-red-500 text-sm">
										{error}
									</p>
								)}
								<div className="pt-4 flex items-center space-x-4">
									<button
										onClick={handleGenerate}
										disabled={isLoading}
										className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600 disabled:bg-blue-300">
										{isLoading
											? "Generating..."
											: "Generate New Voice File"}
									</button>
								</div>
								{generatedAudioUrl && (
									<div className="pt-4">
										<a
											href={generatedAudioUrl}
											download
											className="bg-green-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-green-600">
											Download Generated Audio
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

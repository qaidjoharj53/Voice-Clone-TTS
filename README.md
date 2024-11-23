# Voice Cloner & TTS Application

A full-stack web application that allows users to clone voices and generate text-to-speech audio using the cloned voices. Built with React.js for the frontend and Node.js/Express for the backend, utilizing the PlayHT API for voice cloning and text-to-speech conversion.

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Voice file upload (up to 5MB)
-   Text-to-speech generation (up to 500 characters)
-   Real-time audio preview
-   Generated audio download functionality
-   Responsive design for all devices
-   Error handling and validation

## Tech Stack

### Frontend

-   React.js with TypeScript
-   Tailwind CSS for styling
-   Axios for API communication
-   HTML5 Audio for playback

### Backend

-   Node.js & Express.js
-   PlayHT SDK for voice cloning
-   Multer for file handling
-   CORS for cross-origin requests

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn package manager
-   PlayHT API account credentials
-   Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/qaidjoharj53/Voice-Clone-TTS.git
cd Voice-Clone-TTS
```

2. Install frontend dependencies

```bash
cd client
npm install
```

3. Install backend dependencies

```bash
cd ../server
npm install
```

### Environment Variables

1. Backend (.env in server directory)

```env
PORT=5000
PLAYHT_API_KEY=your_playht_api_key
PLAYHT_USER_ID=your_playht_user_id
```

2. Frontend (.env in client directory)

```env
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server

```bash
cd server
npm start
```

2. Start the frontend development server

```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Voice-Clone-TTS/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   └── App.tsx      # Main application component
│   ├── public/          # Static files
│   └── package.json     # Frontend dependencies
└── server/              # Backend Express application
    ├── routes/         # API route definitions
    ├── controllers/    # Business logic
    ├── server.js       # Express server setup
    └── package.json    # Backend dependencies
```

## Want to Contribute?

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact Us

Feel free to reach out [Qaidjohar Jukker](https://www.qaidjoharjukker.com) if you have any questions or need further assistance. I am always happy to help!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

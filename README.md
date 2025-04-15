# StudyNotion - Online Learning Platform

StudyNotion is a comprehensive online learning platform that connects instructors and students, enabling seamless education delivery and learning experiences.

## Features

### For Students
- Browse and enroll in courses
- Track learning progress
- Access course materials and video content
- Manage profile and account settings
- Secure payment processing

### For Instructors
- Create and publish courses
- Manage course content with sections and subsections
- Track student enrollment and progress
- Customize course information and requirements
- Access instructor dashboard with analytics

### General Features
- User authentication with JWT
- OTP verification for secure signup
- Responsive design for all devices
- Modern UI with intuitive navigation
- Profile management with customizable avatars

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- React Hot Toast for notifications

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- Cookie-parser for session management
- Cloudinary for media storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/RaviP9973/studynotion.git
cd studynotion
```

2. Install dependencies for both frontend and backend
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../src
npm install
```

3. Set up environment variables
Create a `.env` file in the server directory with the following variables:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the development servers
```bash
# Start the backend server
cd server
npm run dev

# Start the frontend server (in a new terminal)
cd src
npm start
```

5. Access the application at `http://localhost:3000`

## Project Structure

```
studynotion/
├── server/                 # Backend code
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── index.js            # Server entry point
│
├── src/                    # Frontend code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── slices/             # Redux slices
│   ├── utils/              # Utility functions
│   └── App.js              # Main application component
│
└── README.md               # Project documentation
```

## Authentication Flow

1. User registers with email and receives OTP
2. OTP verification completes registration
3. User logs in with email and password
4. JWT token is generated and stored in cookies and localStorage
5. Token is used for authenticated API requests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [DiceBear](https://www.dicebear.com/) for avatar generation
- [Cloudinary](https://cloudinary.com/) for media storage
- [MongoDB](https://www.mongodb.com/) for database services


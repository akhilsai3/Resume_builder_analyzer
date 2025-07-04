# Resume Builder

## Description
Resume Builder is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create and manage their resumes online, providing a streamlined interface for adding personal information, education history, work experience, and skills.

The application features a responsive design, ensuring a seamless user experience across different devices. Users can register, log in securely, and save their resume data for future editing. The data is stored in MongoDB Atlas, a cloud-hosted database service.

Additionally, this project includes a simple Resume Analyzer built using Python and Streamlit to check resumes for basic structure, keywords, and formatting to improve their quality.

This repository contains the frontend and backend code for the Resume Builder project.

## Demo
Live Resume Builder: https://resume-builder-analyzer.vercel.app/

Resume Analyzer: https://ats-insight-6wqfhbfhpd9q2thbkz5we2.streamlit.app/



## Technologies Used
  Frontend: React.js, React Router, Axios
  Backend: Node.js, Express.js, MongoDB, Mongoose
  Deployment: Vercel (Frontend), render (Backend), MongoDB Atlas (Database)
  Resume Analyzer using Python,Streamlit,spaCy,NLTK,scikit-learn

## Features
  1)User authentication (register, login, logout)
  2)Create, update, and delete resume sections
  3)Responsive design for mobile and desktop
  4)Secure data storage using MongoDB Atlas
  5)Download resume pdf and edit is available
  6)Two Professional Like Resume Formats
  7)Basic resume analysis for structure and keywords

## Installation
To run this project locally, follow these steps:

Clone the repository:
  git clone https://github.com/your-username/resume-builder.git
  Install dependencies for both frontend and backend:

cd client
npm install
cd ../server
npm install

Set up environment variables:

Create a .env file in the backend directory.
Add your MongoDB connection URI, JWT secret, and any other necessary variables.

Start the development servers:
## Start backend server (runs on http://localhost:8080)
cd server
npm start

## Start frontend development server (runs on http://localhost:3000)
cd client
npm start
Open your browser and navigate to http://localhost:3000 to view the application.

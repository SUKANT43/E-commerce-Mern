🌾 SMART-AGRICONNECT
Smart AgriConnect Banner

A unified digital platform designed to empower farmers through technology, providing tools for subsidy navigation, crop recommendations, digital marketplaces, farm management, and community engagement.

📌 Table of Contents
Problem Statement
Solution
Tech Stack
Project Structure
Installation
Environment Variables
Key Features
Screenshots
API Endpoints
License
🌾 Problem Statement
Challenge

Impact

Unclear subsidy information

Farmers miss financial benefits

No crop demand data

Oversupply leading to low prices

Fragmented knowledge sharing

Limited access to expert advice

Manual trading processes

Inefficient market access

Outdated farm practices

Reduced productivity

💡 Solution
Five Integrated Modules:

Subsidy Navigator - Real-time government scheme tracking
Crop Oracle - AI-powered planting recommendations
AgriMarket - Digital trading with escrow
Farm Genius - IoT-ready management system
Krishi Community - Verified expert Q&A platform
🛠 Tech Stack
Frontend
React 18+: Component-based UI
Vite: Fast build tool
Tailwind CSS: Utility-first styling
Axios: HTTP requests
React Router: Navigation
Backend
Node.js 16+: Runtime environment
Express: Web framework
Mongoose: MongoDB ORM
JWT: Authentication
Cloudinary: Media storage
DevOps
Docker: Containerization
GitHub Actions: CI/CD pipelines
ESLint: Code quality
Prettier: Code formatting
📂 Project Structure
SMART-AGRICONNECT/
├── admin/
│ ├── node_modules/
│ ├── public/
│ │ ├── assets/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .dockerignore
│ ├── Dockerfile
│ ├── package.json
│ └── vite.config.js
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── subsidyController.js
│ ├── models/
│ │ ├── User.js
│ │ └── Subsidy.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── apiRoutes.js
│ ├── utils/
│ │ ├── cloudinary.js
│ │ └── jwt.js
│ ├── .env
│ ├── package.json
│ └── server.js
├── user/
│ ├── node_modules/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js

🚀 Installation
Prerequisites
Node.js v16+
MongoDB 5.0+
Git
Setup Instructions
Clone the repository
git clone https://github.com/SUKANT43/Smart-AgriConnect.git
cd Smart-AgriConnect
Backend Setup

bash
cd backend
npm install
cp .env.example .env  # Update with your credentials
npm start
Frontend (User Portal) Setup

bash
cd ../user
npm install
npm run dev
Admin Panel Setup

bash
cd ../admin
npm install
npm run dev
Running with Docker

bash
docker-compose up --build
🌍 Environment Variables
Create a .env file in the /backend directory with the following content:

env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartagri
JWT_SECRET=your_secure_secret
JWT_EXPIRE=30d
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
✨ Key Features
Admin Portal

User management dashboard

Analytics and reporting

Content moderation tools

System configuration panel

Farmer Dashboard

Subsidy Navigator: Real-time government scheme tracking

Crop Advisor: Data-driven planting recommendations

Marketplace: Digital trading platform

Farm Manager: Production tracking tools

Community Hub: Discussion forums

API Services

RESTful endpoints with JWT authentication

Role-based access control

Rate limiting and request validation

Swagger documentation

Database

MongoDB Atlas cloud integration

Optimized schemas for agricultural data

Indexed queries for performance

Regular backup system

📸 Screenshots

<div align="center"> <img src="https://placehold.co/600x400?text=Admin+Dashboard" alt="Admin Dashboard" width="30%"> <img src="https://placehold.co/600x400?text=Farmer+Portal" alt="Farmer Portal" width="30%"> <img src="https://placehold.co/600x400?text=Mobile+View" alt="Mobile View" width="30%"> </div> 🔌 API Endpoints 🛡️ Authentication Endpoint Method Description /api/auth/register POST Register new user /api/auth/login POST User login /api/auth/me GET Get current user 💰 Subsidies Endpoint Method Description /api/subsidies GET List all subsidies /api/subsidies/:id GET Get subsidy details /api/subsidies/apply POST Apply for subsidy 🛒 Marketplace Endpoint Method Description /api/market/listings GET Get all listings /api/market/listings POST Create new listing /api/market/listings/:id GET Get listing details 👥 Community Endpoint Method Description /api/community/posts GET Get all posts /api/community/posts POST Create new post /api/community/posts/:id GET Get post details 📜 License This project is licensed under the MIT License - see the LICENSE file for details.
This consolidated markdown file:

Maintains proper section ordering
Preserves all original content
Fixes formatting issues
Ensures consistent heading levels
Properly organizes code blocks and tables
Maintains all links and images
Copy message
Edit message

BLACKBOXAI

🌾 SMART-AGRICONNECT
Smart AgriConnect Banner

A unified digital platform designed to empower farmers through technology, providing tools for subsidy navigation, crop recommendations, digital marketplaces, farm management, and community engagement.

📌 Table of Contents
Problem Statement
Solution
Tech Stack
Project Structure
Installation
Environment Variables
Key Features
Screenshots
API Endpoints
License
🌾 Problem Statement
Challenge

Impact

Unclear subsidy information

Farmers miss financial benefits

No crop demand data

Oversupply leading to low prices

Fragmented knowledge sharing

Limited access to expert advice

Manual trading processes

Inefficient market access

Outdated farm practices

Reduced productivity

💡 Solution
Five Integrated Modules:

Subsidy Navigator - Real-time government scheme tracking
Crop Oracle - AI-powered planting recommendations
AgriMarket - Digital trading with escrow
Farm Genius - IoT-ready management system
Krishi Community - Verified expert Q&A platform
🛠 Tech Stack
Frontend
React 18+: Component-based UI
Vite: Fast build tool
Tailwind CSS: Utility-first styling
Axios: HTTP requests
React Router: Navigation
Backend
Node.js 16+: Runtime environment
Express: Web framework
Mongoose: MongoDB ORM
JWT: Authentication
Cloudinary: Media storage
DevOps
Docker: Containerization
GitHub Actions: CI/CD pipelines
ESLint: Code quality
Prettier: Code formatting
📂 Project Structure
Run
Copy code
SMART-AGRICONNECT/
├── admin/
│   ├── node_modules/
│   ├── public/
│   │   ├── assets/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── subsidyController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Subsidy.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── apiRoutes.js
│   ├── utils/
│   │   ├── cloudinary.js
│   │   └── jwt.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── user/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
🚀 Installation
Prerequisites
Node.js v16+
MongoDB 5.0+
Git
Setup Instructions
Clone the repository

bash
Run
Copy code
git clone https://github.com/SUKANT43/Smart-AgriConnect.git
cd Smart-AgriConnect
Backend Setup

bash
Run
Copy code
cd backend
npm install
cp .env.example .env  # Update with your credentials
npm start
Frontend (User Portal) Setup

bash
Run
Copy code
cd ../user
npm install
npm run dev
Admin Panel Setup

bash
Run
Copy code
cd ../admin
npm install
npm run dev
Running with Docker

bash
Run
Copy code
docker-compose up --build
🌍 Environment Variables
Create a .env file in the /backend directory with the following content:

Run
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartagri
JWT_SECRET=your_secure_secret
JWT_EXPIRE=30d
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
✨ Key Features
Admin Portal
User management dashboard
Analytics and reporting
Content moderation tools
System configuration panel
Farmer Dashboard
Subsidy Navigator: Real-time government scheme tracking
Crop Advisor: Data-driven planting recommendations
Marketplace: Digital trading platform
Farm Manager: Production tracking tools
Community Hub: Discussion forums
API Services
RESTful endpoints with JWT authentication
Role-based access control
Rate limiting and request validation
Swagger documentation
Database
MongoDB Atlas cloud integration
Optimized schemas for agricultural data
Indexed queries for performance
Regular backup system
📸 Screenshots
<div align="center"> <img src="https://placehold.co/600x400?text=Admin+Dashboard" alt="Admin Dashboard" width="30%"> <img src="https://placehold.co/600x400?text=Farmer+Portal" alt="Farmer Portal" width="30%"> <img src="https://placehold.co/600x400?text=Mobile+View" alt="Mobile View" width="30%"> </div>
🔌 API Endpoints
🛡️ Authentication
Endpoint

Method

Description

/api/auth/register

POST

Register new user

/api/auth/login

POST

User login

/api/auth/me

GET

Get current user

💰 Subsidies
Endpoint

Method

Description

/api/subsidies

GET

List all subsidies

/api/subsidies/:id

GET

Get subsidy details

/api/subsidies/apply

POST

Apply for subsidy

🛒 Marketplace
Endpoint

Method

Description

/api/market/listings

GET

Get all listings

/api/market/listings

POST

Create new listing

/api/market/listings/:id

GET

Get listing details

👥 Community
Endpoint

Method

Description

/api/community/posts

GET

Get all posts

/api/community/posts

POST

Create new post

/api/community/posts/:id

GET

Get post details

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.


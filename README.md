# 🛒 Click and Collect - MERN E-Commerce Website

## 🚀 Overview
This is a full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** e-commerce website called **Click and Collect**. This project includes a **Seller Dashboard** but does not include an order button.

## 📌 Features
- User authentication (Register/Login) with JWT
- Seller dashboard for managing products
- Secure routes using middleware
- CRUD operations for products
- Password hashing with **bcryptjs**
- State management using **Context API**
- API calls with **Axios**
- **Tailwind CSS** for styling

---

## 🛠️ Tech Stack
### Backend (Node.js, Express, MongoDB)
- **Express.js** - Backend framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

### Frontend (React.js)
- **React.js** - Frontend framework
- **React Router** - Navigation
- **Context API** - State management
- **Axios** - API requests
- **Tailwind CSS** - Styling

---

## ⚙️ Installation
### 1️⃣ Clone the repository
```sh
git clone (https://github.com/SUKANT43/E-commerce-Mern)
cd click-and-collect
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
- Create a `.env` file in `backend/` and add:
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/clickandcollect
JWT_SECRET=your_jwt_secret
```
- Start the backend server:
```sh
npm start
```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
```
- Start the frontend:
```sh
npm start
```

---

## 🚀 Usage
- Open **http://localhost:3000/**
- Register/Login as a seller
- Manage products through the **Seller Dashboard**

---

## 📂 Project Structure
```
click-and-collect/
│── backend/
│   ├── config/
│   ├── controller/
│   ├── middleWare/
│   ├── model/
│   ├── routes/
│   ├── server.js
│── frontend/
│   ├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
```

---

## 📜 API Endpoints
### 🔹 User Routes (`/api/user`)
| Method | Route | Description |
|--------|------------|----------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate a user |
| GET | `/me` | Get user profile |

### 🔹 Product Routes (`/api/products`)
| Method | Route | Description |
|--------|------------|----------------|
| GET | `/` | Get all products |
| POST | `/add` | Add a new product |
| PUT | `/update/:id` | Update a product |
| DELETE | `/delete/:id` | Delete a product |

---

## 🛠️ Tools Used
- **Postman** - API Testing
- **MongoDB Compass** - Database Management

---

## 📜 License
This project is **MIT Licensed**. Feel free to use and modify it.

---

## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`feature-new`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature-new`)
5. Create a **Pull Request**

---

## 💡 Contact
For any questions or suggestions, feel free to reach out:
- **Email:** your-sukant98657@gmail.com

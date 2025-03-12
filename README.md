# 🛒 Click and Collect - MERN E-Commerce Website

## 🚀 Overview
This is a full-stack **MERN (MongoDB, Express.js, React.js, Node.js) and Cloudinary** e-commerce website called **Click and Collect**. This project includes a **Seller Dashboard** but does not include an order button.

## 📌 Features
- User authentication (Register/Login) with JWT
- Seller dashboard for managing products
- Secure routes using middleware
- CRUD operations for products
- Password hashing with **bcryptjs**
- State management using **Context API**
- API calls with **Axios**
- **Tailwind CSS** for styling
- **Cloudinary** for storing image

---

## 🛠️ Tech Stack
### Backend (Node.js, Express, MongoDB)
- **Express.js** - Backend framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **Cloudinary** - Cloud Storage
  
### Frontend (React.js)
- **React.js** - Frontend framework
- **React Router** - Navigation
- **Context API** - State management
- **Axios** - API requests
- **Tailwind CSS** - Styling

---

### Demo Images

### User Page:
![Screenshot 2025-03-12 190227](https://github.com/user-attachments/assets/e90cec61-fb8a-4dd1-8839-8cbde442fce3)
![Screenshot 2025-03-12 190238](https://github.com/user-attachments/assets/c0bcb990-dd18-4416-99f8-d4536ec84e1e)
![Screenshot 2025-03-12 190250](https://github.com/user-attachments/assets/4b3ecf16-8929-49c3-9b98-cf25aee4b8b5)
![Screenshot 2025-03-12 190314](https://github.com/user-attachments/assets/c252234d-79d5-40e5-a10f-248d105f5085)

### Seller Page:
![Screenshot 2025-03-12 190046](https://github.com/user-attachments/assets/4a30eefd-5c55-46b9-892c-8269044f76f0)
![Screenshot 2025-03-12 190107](https://github.com/user-attachments/assets/3e45c669-b2ce-46b5-91aa-b1ca70047b36)
![Screenshot 2025-03-12 190123](https://github.com/user-attachments/assets/0a2b752b-ce76-45d7-82cf-47c416f43118)
![Screenshot 2025-03-12 190136](https://github.com/user-attachments/assets/cff4ad31-1b4e-4817-8e59-72a19bf7d72b)

---
## ⚙️ Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/SUKANT43/E-commerce-Mern
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

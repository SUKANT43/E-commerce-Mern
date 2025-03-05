const sellerLoginModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const isEmailAlreadyExist = await sellerLoginModel.findOne({ email });
        if (isEmailAlreadyExist) {
            return res.status(409).json({ msg: "User already exists" }); // 409 Conflict
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await sellerLoginModel.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            msg: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const user = await sellerLoginModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "No user found, please register first" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        return res.status(200).json({
            msg: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token: createJWT(user.id)
        });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
};

const me = async (req, res) => {
    try {
        const user = await sellerLoginModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
};



const changePassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;

        if (!email || !password || !newPassword) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const user = await sellerLoginModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();  

        return res.status(200).json({ msg: "Password updated successfully" });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
};


const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = { register, login, me, changePassword };

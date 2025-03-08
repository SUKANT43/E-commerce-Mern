const sellerLogin = require('../model/sellerLoginModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Enter all fields" });
        }

        const isUserAlreadyExist = await sellerLogin.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(409).json({ msg: "User already exists. Try with a new email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newSeller = await sellerLogin.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({ newSeller });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Enter all the fields" });
        }

        const findUser = await sellerLogin.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ msg: "No user found with this email. Please register first." });
        }

        const comparePass = await bcrypt.compare(password, findUser.password);
        if (!comparePass) {
            return res.status(401).json({ msg: "Incorrect password. Please enter the correct password." });
        }

        return res.status(200).json({
            name: findUser.name,
            email: findUser.email,
            token: generateJWT(findUser.id)
        });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

const me = async (req, res) => {
    try {
        const { id, name, email } = await sellerLogin.findById(req.user.id);
        return res.status(200).json({
            name,
            });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;

        if (!email || !password || !newPassword) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const user = await sellerLogin.findOne({ email });
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

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    register,
    login,
    me,
    changePassword,
};

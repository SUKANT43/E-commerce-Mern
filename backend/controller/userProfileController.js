const userLoginModel = require('../model/userLoginModel');

const newUserData = async (req, res) => {
    try {
        const { doorNo, street, city, district, state } = req.body;

        if (!doorNo || !street || !city || !district || !state) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const existing = await userLoginModel.findOne({ userId: req.user.id });
        if (existing) {
            return res.status(200).json({ msg: "You already have an address" });
        }

        const newData = await userLoginModel.create({
            userId: req.user.id,
            name: req.user.name,
            email: req.user.email,
            doorNo,
            street,
            city,
            district,
            state
        });

        return res.status(201).json({ newData });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

const editUserData = async (req, res) => {
    try {
        const { doorNo, street, city, district, state } = req.body;

        if (!doorNo || !street || !city || !district || !state) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const updated = await userLoginModel.findOneAndUpdate(
            { userId: req.user.id },
            { doorNo, street, city, district, state },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ updateData: updated });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

const getUserData = async (req, res) => {
    try {
        const data = await userLoginModel.findOne({ userId: req.user.id });

        if (!data) {
            return res.status(404).json({ msg: "Add your address" });
        }

        return res.status(200).json({ data });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await userLoginModel.findOneAndDelete({ userId: req.user.id });

        if (!deleted) {
            return res.status(404).json({ msg: "First create your address" });
        }

        return res.status(200).json({ msg: "Address deleted successfully" });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = { newUserData, editUserData, getUserData, deleteUser };

const formModel = require("../models/formModel");

const getForms = async (req, res) => {
    try {
        const forms = await formModel.find();
        res.status(200).json({ forms });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const registerForm = async (req, res) => {
    try {
        const form = new formModel(req.body);
        await form.save();
        res.status(201).json({ message: "Form registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateForm = async (req, res) => {
    try {
        const form = await formModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!form) {
            return res.status(404).json({ error: "Form not found" });
        }
        res.status(200).json({ form });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const patchForm = async (req, res) => {
    try {
        const form = await formModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!form) {
            return res.status(404).json({ error: "Form not found" });
        }
        res.status(200).json({ form });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteForm = async (req, res) => {
    try {
        const form = await formModel.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({ error: "Form not found" });
        }
        res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getForms, registerForm, updateForm, patchForm, deleteForm };

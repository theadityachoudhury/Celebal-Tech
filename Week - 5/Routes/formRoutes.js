const express = require('express');
const { formValidator } = require("../Controllers/validators");
const { getForms, registerForm, updateForm, patchForm, deleteForm } = require('../Controllers/formController');

const router = express.Router();

router.get("/", getForms);
router.post("/", formValidator, registerForm);
router.put("/:id", formValidator, updateForm);
router.patch("/:id", formValidator, patchForm);
router.delete("/:id", deleteForm);

module.exports = router;

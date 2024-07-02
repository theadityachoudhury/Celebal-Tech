const joi = require('joi');

const formSchemaJoi = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

const formValidator = async (req, res, next) => {
    try {
        await formSchemaJoi.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { formValidator };

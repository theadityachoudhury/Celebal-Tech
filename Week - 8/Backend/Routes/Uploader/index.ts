import express from "express";
import path from "path";
import fs from 'fs-extra';
import multer from 'multer';

const app = express.Router();

const ensurePublicFolderExists = async () => {
    const publicPath = path.join(__dirname, '..', '..', 'public');
    try {
        await fs.ensureDir(publicPath);
        console.log(`Public folder ensured at ${publicPath}`);
    } catch (error) {
        console.error(`Error ensuring public folder: ${error}`);
    }
};


const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const publicPath = path.join(__dirname, '..', '..', 'public');
        await ensurePublicFolderExists();
        cb(null, publicPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    res.status(200).send({
        message: 'File uploaded successfully',
        filePath: `/public/${req.file.filename}`,
    });
});

app.use('/public', express.static(path.join(__dirname, 'public')));

export default app;
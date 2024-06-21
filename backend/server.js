// Packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

// Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';

// Utils
import connectMongoDB from './db/connectMongoDB.js';

// Configs
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet()); // Add Helmet to enhance API's security
app.use(cors()); // Add CORS if needed
app.use(express.json()); //to parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //to pass cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("Server is ready!");
});

// Error handling middleware should be the last middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to MongoDB and then start the server
connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

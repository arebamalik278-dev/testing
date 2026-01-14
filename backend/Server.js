const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 1. Database Connection (Creates "testing" database)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testing";
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connected to 'testing' database"))
    .catch(err => console.error("❌ Connection error:", err));

// 2. Schemas & Models
const UserSchema = new mongoose.Schema({ email: String, name: String, role: String });
const AdminSchema = new mongoose.Schema({ email: String, name: String, permissions: Array });

const User = mongoose.model('User', UserSchema);   // Collection: users
const Admin = mongoose.model('Admin', AdminSchema); // Collection: admins

// --- API ROUTES ---

// Helper function for CRUD logic to avoid repeating code
const createCrudRoutes = (routePath, Model) => {
    // CREATE
    app.post(`/api/${routePath}`, async (req, res) => {
        const newItem = new Model(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    });

    // READ (Get All)
    app.get(`/api/${routePath}`, async (req, res) => {
        const items = await Model.find();
        res.json(items);
    });

    // UPDATE
    app.put(`/api/${routePath}/:id`, async (req, res) => {
        const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    });

    // DELETE
    app.delete(`/api/${routePath}/:id`, async (req, res) => {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: `${routePath} deleted successfully` });
    });
};

// Initialize routes for both collections
createCrudRoutes('users', User);
createCrudRoutes('admins', Admin);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
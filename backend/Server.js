const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB (use environment variable for security)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB Error:", err));

// Your Routes
app.get("/", (req, res) => res.send("MERN Backend Running on Vercel"));
app.get("/api/test", (req, res) => res.json({ message: "Success!" }));

// IMPORTANT: Vercel specific logic
// Local development uses app.listen, but Vercel handles this automatically
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// THIS IS REQUIRED for Vercel to find your app
module.exports = app;
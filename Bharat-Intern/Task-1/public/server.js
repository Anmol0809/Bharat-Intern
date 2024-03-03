const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration-form', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const app = express();

// Serve static files (HTML, CSS)
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Handle form submission
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.send('User registered successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while registering user.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

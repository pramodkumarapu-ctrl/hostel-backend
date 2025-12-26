const express = require('express');
const cors = require('cors'); // 1. Import
const app = express();

// 2. Configure CORS - This MUST come before your routes!
app.use(cors({
  origin: 'http://localhost:3001', // Your Frontend Port
  credentials: true
}));

app.use(express.json()); // To read JSON data from login

// 3. Your Login Route
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === "yash@gmail.com" && password === "123456") {
    // Generate a simple token or return success
    return res.status(200).json({ 
      token: "your_real_jwt_token_here", 
      message: "Login successful" 
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(3000, () => {
  console.log('Backend is running on http://localhost:3000');
});
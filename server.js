// main entry file 
// imoport express 


const express = require('express');

// import DB
const connectDB = require('./config/db');

// initialize app variable with express 
const app = express();

// Connect Database
connectDB();

// Init Middleware bodyparser, extended false (!post nested objects )
app.use(express.json({ extended: false }));

// End point 
app.get('/', (req, res) => res.send('API Running'));

// Define Routes to access the routes from API files (user, auth)
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


// listen to env port  || 5000
const PORT = process.env.PORT || 5000;

// on listen 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
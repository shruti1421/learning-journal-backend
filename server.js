const express = require('express');
const connectDB = require('./config/db');


const app = express();

// Connect Database
connectDB();


// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/journals', require('./routes/journals'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

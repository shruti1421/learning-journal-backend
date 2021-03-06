const express = require('express');
const bodyParser=require('body-parser');
const dotenv= require("dotenv");
const connectDB = require('./config/db');
var cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect Database
dotenv.config({path: '.env'})
connectDB();

app.get("/", function(req,res){
  res.send("Learning Journal Backend")
});
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/journals', require('./routes/journals'));
app.use('/api/journals/share', require('./routes/shareJournal'));
app.use('/api/journals/favorites',require('./routes/favorites'))
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

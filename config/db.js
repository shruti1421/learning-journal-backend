const mongoose = require('mongoose');

const connectDB = async () => {

    try{
            const con = await mongoose.connect(process.env.mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
    
            console.log('MongoDB Connected...');

    }catch(err){
           console.error(err.message);
           process.exit(1);  
    }

};

module.exports = connectDB;
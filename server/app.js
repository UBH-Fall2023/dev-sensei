const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();
const authRoutes = require('./routes/auth');
const ideaRoutes = require('./routes/idea');

const { DATABASE } = require('./config/keys');
const path = require("path");

// app
const app = express();

// db
mongoose
    .connect(DATABASE, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', ideaRoutes);


const port = process.env.PORT || 8000;


if(process.env.NODE_ENV=="production"){
    const path = require('path')
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get("*",(req,res)=>{
        // res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
        res.sendFile(path.resolve(path.join(__dirname, '../frontend/build'),'index.html'))
    })
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.timeout = 100000000;
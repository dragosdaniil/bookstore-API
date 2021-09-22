// import prerequisites
const express = require('express');
// const http = require('http');
// const https = require('https');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const auth = require('./middleware/authentication');
const {customError} = require('./middleware/error');

// Middleware
app.use(auth);
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: "*",
    preflightContinue: false
  }));
app.use(helmet());
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(routes);
app.use(customError);

// TODO:
//  - Create a custom error function to handle errors - DONE
//  - read about headers, how they influence the system and add them - ALMOST DONE
//  - Learn how to save images in the API for the frontend part - DONE

//  - What is https and how can I use it?
//  - What are https credentials?
//  - Read more about cookies and how to use them

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// Server startup
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server listens on port ${PORT}...`);
});

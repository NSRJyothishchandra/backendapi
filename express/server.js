'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const Auth = require("./routes/users")
const loginandsignupRouter = require("./routes/loginandsignupRouter")
var uri = "mongodb+srv://svucewdcwdc:svucewdcwdc@cluster0.vkoy5.mongodb.net/svuce_data?retryWrites=true&w=majority"

const cors = require('cors')
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})


const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.use("/login",loginRouter)
router.use("/auth",Auth)
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
app.use(cors())
app.use(bodyParser.json());

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

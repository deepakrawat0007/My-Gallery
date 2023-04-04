const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const LoginRoute = require("./Routes/Login")
const RegisterRoute = require("./Routes/Registration")
const Authentication = require('./middleware/autherization')
const ImageViewRoute = require("./Routes/ImageView")
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/" , LoginRoute);
app.use("/" , RegisterRoute);
app.use("/" , Authentication , ImageViewRoute)

app.get('/',(req,res)=>{
    res.status(200).json({
        "Message":"Server is OK"
    })
})

module.exports = app
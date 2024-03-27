const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const productRouter = require("./product.router");

const app = express();

//Running Server
app.listen(4200, ()=>{
    console.log("Server is listening on port 4200");
});

//Middle ware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) =>{
    //res.send("<h1>Welcome to Express</h1>");
    res.sendFile( path.join( __dirname,  "./index.html"));
});

//run router as a middleware
app.use("/", productRouter);


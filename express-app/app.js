const express = require("express");

const app = express();

app.listen(4200, ()=>{
    console.log("Server is listening on port 4200");
});

app.get("/", (req, res) =>{
    //res.send("<h1>Welcome to Express</h1>");
    res.sendFile(__dirname + "/index.html");
});

app.get("/store/products", function (req, res){
    let products = [ {
        id : 900,
        name : "Infinix note 7",
        price: 30000
    },
    {
        id : 901,
        name : "Infinix note 30",
        price: 39000
    }
];

    res.send(products);
});
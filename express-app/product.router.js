const express = require("express");
const productRouter = express.Router();

let products = [{
    id: 900,
    name: "Infinix note 7",
    price: 30000
},
{
    id: 901,
    name: "Infinix note 30",
    price: 39000
},
{
    id: 902,
    name: "Infinix Hot 40",
    price: 36000
}
];

//get operations
//http://localhost:4200/
//http://localhost:4200/products
//http://localhost:4200/products/id

//post opertion
//http://localhost:4200/products

//Get all products
productRouter.get("/products", function (req, res) {
    res.send(products);
});

//Get product by id
productRouter.get("/products/:id", (req, res)=>{
    const product = products.find(p=> p.id == req.params.id);
    res.send(product);
});

//Create new product
productRouter.post("/products", (req, res) => {
    let body = req.body;
    if(body.name && body.price){
        body.id = products[products.length -1].id + 1;
        products.push(req.body);
    }
    res.redirect("/");
});

//Delete a product
productRouter.delete("/products/:id", (req, res)=> {
    const product = products.find(p=> p.id == req.params.id);
    products.splice(products.findIndex(p=> p.id == product.id), 1);
    res.send({
        product,
        redirect: true
    });
});

productRouter.put("/products", (req, res)=>{
    const product = req.body;
    const productToUpdate = products.find(p => p.id == product.id);
    products.splice(products.indexOf(productToUpdate), 1, productToUpdate);
    res.send(productToUpdate);
});
// productRouter.patch();

module.exports = productRouter;
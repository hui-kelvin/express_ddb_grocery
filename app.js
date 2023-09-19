const express = require('express');
const bodyParser = require('body-parser');
const GroceryItem = require('./models/GroceryItem');
const groceryDao = require('./repository/groceryDao');

const server = express();
const PORT = 3000;

server.use(bodyParser.json());

function validateNewItem(req, res, next){
    if(!req.body.name || !req.body.quantity || !req.body.price){
        req.body.valid = false;
        next();
    }else{
        req.body.valid = true;
        next();
    }
}

server.get('/grocery-list',(req,res) => {
    groceryDao.getAllGroceryItems()
        .then((data) => {
            res.send(data.Items)
        })
        .catch((err)=> {
            message: err
        })
})

server.post('/grocery-list/add',validateNewItem, (req, res) => {
    const body = req.body;
    if(req.body.valid){
        const { name, price, quantity } = req.body;
        const newItem = new GroceryItem(name, price, quantity);
        groceryDao.addGroceryItem(newItem)
            .then((data) => {
                res.send({
                    message: "Successfully Added Item!"
                })
            })
            .catch((err) => {
                res.send({
                    message: "Failed to Add Item!"
                })
            })
    }else{
        res.send({
            message: "Invalid Item properties"
        })
    }
})

server.delete('/grocery-list/delete/:uuid',(req,res)=> {
    const uuid = req.params.uuid;
    groceryDao.deleteGroceryItem(uuid)
        .then((data) => {
            res.send({
                message: "Successfully Deleted Item!"
            })
        })
        .catch((err) => {
            res.send({
                message: "Failed to Delete Item!"
            })
        })
})


server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})
const uuid = require('uuid');

class GroceryItem {
    constructor(name,price,quantity) {
        this.uuid = uuid.v4();
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.status = "not bought";
    }
}

module.exports = GroceryItem;
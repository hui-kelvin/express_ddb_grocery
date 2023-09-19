const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-west-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'GroceryItems';

function getAllGroceryItems() {
  const params = {
    TableName: tableName
  };
  return docClient.scan(params).promise();
}

function addGroceryItem(groceryItem) {
  const params = {
    TableName: tableName,
    Item: groceryItem
  };
  return docClient.put(params).promise();
}

function updateGroceryNameById(uuid, newName) {
    const params = {
        TableName: tableName,
        Key: { uuid },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'name'
        },
        ExpressionAttributeValues: {
            ':value': newName
        }
    }
    return docClient.update(params).promise();
}

function updateGroceryQuantityById(uuid, newQuantity) {
    const params = {
        TableName: tableName,
        Key: { uuid },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'quantity'
        },
        ExpressionAttributeValues: {
            ':value': newQuantity
        }
    }
    return docClient.update(params).promise();
}

function updateGroceryPriceById(uuid, newPrice) {
    const params = {
        TableName: tableName,
        Key: { uuid },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'price'
        },
        ExpressionAttributeValues: {
            ':value': newPrice
        }
    }
    return docClient.update(params).promise();
}

function updateGroceryStatusById(uuid, newStatus) {
    const params = {
        TableName: tableName,
        Key: { uuid },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'status'
        },
        ExpressionAttributeValues: {
            ':value': newStatus
        }
    }
    return docClient.update(params).promise();
}

function deleteGroceryItem(uuid) {
  const params = {
    TableName: tableName,
    Key: { uuid }
  };
  return docClient.delete(params).promise();
}

module.exports = {
  getAllGroceryItems,
  addGroceryItem,
  updateGroceryNameById,
  updateGroceryPriceById,
  updateGroceryQuantityById,
  updateGroceryStatusById,
  deleteGroceryItem
};
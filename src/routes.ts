import { Db } from "mongodb";

// TODO Declare your interfaces here
interface FruitPrice {
  // We need costPrice, marketPrice, salePrice properties
  costPrice: number
  marketPrice: number
  salePrice: number
}
 
interface FruitPurchase {
  // We need type, quantitySold, buyer, discounted properties
}

/**
 * @param numbers is an array of numbers to sum up
 * @returns the sum of all numbers in the array
 */
function sumNumbers(numbers: Array<number>) {
  // TODO Method 1: using for loop
  var sum = 0
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }
  return sum

  // TODO Method 2: using do...while

  return 0
}


/**
 * @param fruit is the fruit object being sold
 * @returns true if any of the following is true:
 *          - the cost of the fruit is higher than the sale price
 *          - if fruit is sold at market price instead of the sale price, it would have double the profit or more 
 */
function salePriceAtAlert(fruit: FruitPrice) {
  // TODO
  var prof1 = fruit.salePrice - fruit.costPrice
  var prof2 = fruit.marketPrice - fruit.costPrice
  if (prof2 >= prof1 * 2) {
    return true
  } 

  //fruit.costPrice > fruit.salePrice || fruit.costPrice >= fruit.marketPrice * 2
  return false
}
 

// JS/TS is a synchronous, blocking, single-threaded language
// MongoClient runs asynchronously (concurrently executing asynchronous operations)
// MongoDB operations return a promise, which is why we need to use async/await here 
// Will elaborate on async/await during the React workshop! 

/**
 * @param db is a database object
 * @returns an array of all unique fruits from all the fruit purchases
 */
function getAllFruitTypes(db: Db) {
  // Feel free to practice searching in the documentation/online to complete the steps below!
  // TODO step 1: get the fruit collection object from db
  // TODO step 2: get the distinct (<- this is a hint!) types of all fruit purchases in the collection 

  return []
}


/**
 * @param db is a database object
 * @param type is the type of fruit to query for
 * @returns an array of all purchases of the type of fruit
 */
async function getAllPurchaseByType(db: Db, type: string) {
  // TODO
  
  return []
}


/**
 * Adds a new purchase to the fruits collection
 * @param db is a database object
 * @param fruitPurchase is the new fruit purchase to add to the collection
 */
async function addPurchase(db: Db, fruitPurchase: FruitPurchase) {
  // TODO

  // !!! Use try/catch to make sure that your app handles error correctly. For now, console log an error statement in the catch block
}

module.exports = () => {
  const express = require("express");
  const router = express.Router();

  // To send a get request, go to web browser and type in:
  // http://localhost:8080/api/<route>/<params>

  /**** Routes ****/
  router.get('/hello', async (req, res) => {
    res.json({msg: "Hello, world!"});
  });

  router.get('/hello/:name', async (req, res) => {
    res.json({msg: `Hello, ${req.params.name}`});
  });

  router.get('/sumNumbers', async (req, res) => {
    const numbers = [1,5,3,4,2,9,15] //correct sum for this array is 39
    const sum = sumNumbers(numbers) 
    res.json({msg: `sum of all numbers in, ${numbers} is ${sum}`});
  })

  router.get('/priceAlert', async (req, res) => {
    let fruitPrices: FruitPrice = {
      costPrice: 0,
      marketPrice: 0,
      salePrice: 0
    }; // TODO: Add an example to declare a FruitPrice object
    const alert = salePriceAtAlert(fruitPrices);
    res.json({msg: `price alert should be triggered due to high market price: , ${alert}`}); // TODO: change response message accordingly
  })

  router.get('/getAllFruitTypes', async (req, res) => {
    // Get database object
    const dbo = require("./db/conn");
    const db = dbo.getDb()

    const types = getAllFruitTypes(db)
    res.json({msg: `All fruit types: ${types}`});
  });
  
  router.get('/getAllPurchaseByType/:type', async (req, res) => {
    const dbo = require("./db/conn");
    const db = dbo.getDb()
    const type = "" // TODO: get the type specified by request parameter!
    const purchases = await getAllPurchaseByType(db, type)
    res.json({msg: `All purchases of type ${type} count: ${purchases.length}`});
  });

  // this is a get request as a demo because we cannot send POST parameters through URL
  // should be a post request when frontend comes in
  router.get('/addPurchase', async (req, res) => {
    const dbo = require("./db/conn");
    const db = dbo.getDb()
    // You can play around with the information below. Check if your purchase is added to the collection with Miyuki!
    const fruitPurchase = { } //TODO declare fruit purchase example
    await addPurchase(db, fruitPurchase)
    res.json({msg: `Purchase added`});
  });

  return router;
}

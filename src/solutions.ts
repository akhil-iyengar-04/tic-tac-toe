import { Db } from "mongodb";

/**
 * @param numbers is an array of numbers to sum up
 * @returns the sum of all numbers in the array
 */
function sumNumbers(numbers: Array<number>) {
  // using for loop
  let sum = 0
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }

  // using do...while
  // let i = 0 
  // do {
  //   sum += numbers[i]
  //   i ++
  // } while (i < numbers.length)
  // return sum
}


// Interface introduction
interface FruitPrice {
  costPrice: number;
  marketPrice: number;
  salePrice: number;
}
 
interface FruitPurchase {
  type: string;
  quantitySold: number;
  buyer: string;
  discounted: boolean
}
/**
 * @param fruit is the fruit object being sold
 * @returns true if any of the following is true:
 *          - the cost of the fruit is higher than the sale price
 *          - if fruit is sold at market price instead of the sale price, it would have double the profit or more 
 */
function salePriceAtAlert(fruit: FruitPrice) {
  if (fruit.costPrice > fruit.salePrice) {
    return true 
  } else if (fruit.marketPrice - fruit.costPrice >= 2*(fruit.salePrice - fruit.costPrice)) {
    return true 
  } else {
    return false
  }
}
 

// JS/TS is a synchronous, blocking, single-threaded language
// MongoClient runs asynchronously (concurrently executing asynchronous operations)
// MongoDB operations return a promise, which is why we need to use async/await here 
// Will elaborate on async/await during the React workshop! 

/**
 * @param db is a database object
 * @returns an array of all unique fruits from all the fruit purchases
 */
async function getAllFruitTypes(db: Db) {
  const types = await db.collection('fruits').distinct('type')
  return types
}


/**
 * @param db is a database object
 * @param type is the type of fruit to query for
 * @returns an array of all purchases of the type of fruit
 */
async function getAllPurchaseByType(db: Db, type: string) {
  const fruits = await db.collection('fruits').find({type: type}).toArray()
  return fruits
}


/**
 * Adds a new purchase to the fruits collection
 * @param db is a database object
 * @param fruitPurchase is the new fruit purchase to add to the collection
 */
async function addPurchase(db: Db, fruitPurchase: FruitPurchase) {
  try {
    await db.collection('fruits').insertOne({
      type: fruitPurchase.type,
      quantitySold: fruitPurchase.quantitySold,
      buyer: fruitPurchase.buyer, 
      discounted: fruitPurchase.discounted
    })
  } catch(err) {
    console.log("purchase add failed: ", err)
  }
  
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
    let fruitPrices: FruitPrice = { costPrice: 8, salePrice: 10, marketPrice: 13 };
    const alert = salePriceAtAlert(fruitPrices);
    res.json({msg: `price alert should be triggered due to high market price: , ${alert}`});
  })

  router.get('/getAllFruitTypes', async (req, res) => {
    const dbo = require("./db/conn");
    const db = dbo.getDb()
    const types =  await getAllFruitTypes(db)
    res.json({msg: `All fruit types: ${types}`});
  });
  
  router.get('/getAllPurchaseByType/:type', async (req, res) => {
    const dbo = require("./db/conn");
    const db = dbo.getDb()
    const purchases = await getAllPurchaseByType(db, req.params.type)
    res.json({msg: `All purchases of type ${req.params.type} count: ${purchases.length}`});
  });

  // this is a get request as a demo because we cannot send POST parameters through URL
  // should be a post request when frontend comes in
  router.get('/addPurchase', async (req, res) => {
    const dbo = require("./db/conn");
    const db = dbo.getDb()
    // Change information below
    const fruitPurchase = {
      type: 'peach',
      quantitySold: 50,
      buyer: "Jiho",
      discounted: true
    }
    await addPurchase(db, fruitPurchase)
    res.json({msg: `Purchase added`});
  });

  return router;
}

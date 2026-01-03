require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const admin = require("firebase-admin");
// const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

// const serviceAccount = require("./clubsphere-firebase-adminsdk.json");
// const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8')
// const serviceAccount = JSON.parse(decoded);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8vhjke1.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("restaurant_db");
    const restaurantCollection = db.collection("restaurants");
    const ordersCollection = db.collection("orders");
    const reviewsCollection = db.collection("reviews");
    const usersCollection = db.collection("users");
    const menuItemsCollection = db.collection("menuItems");

    // CREATE
    app.post("/restaurants", async (req, res) => {
      const restaurant = req.body;
      const email = restaurant.restaurantEmail;
      const restaurantExists = await restaurantCollection.findOne({
        restaurantEmail: email,
      });

      if (restaurantExists) {
        return res.send({ message: "Restaurant Already Exists" });
      }
      const result = await restaurantCollection.insertOne(restaurant);
      res.send(result);
    });

    // READ ALL
    app.get("/restaurants", async (req, res) => {
      const result = await restaurantCollection.find().toArray();
      res.send(result);
    });

    // READ ONE
    app.get("/restaurants/:id", async (req, res) => {
      const result = await restaurantCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // UPDATE
    app.put("/restaurants/:id", async (req, res) => {
      const updatedRestaurant = req.body;
      const result = await restaurantCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedRestaurant }
      );
      res.send(result);
    });

    // DELETE
    app.delete("/restaurants/:id", async (req, res) => {
      const result = await restaurantCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // CREATE
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      res.send(result);
    });

    // READ ALL
    app.get("/orders", async (req, res) => {
      const result = await ordersCollection.find().toArray();
      res.send(result);
    });

    // READ ONE
    app.get("/orders/:id", async (req, res) => {
      const result = await ordersCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // UPDATE
    app.put("/orders/:id", async (req, res) => {
      const updatedOrder = req.body;
      const result = await ordersCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedOrder }
      );
      res.send(result);
    });

    // DELETE
    app.delete("/orders/:id", async (req, res) => {
      const result = await ordersCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // CREATE
    app.post("/menuItems", async (req, res) => {
      const item = req.body;
      const result = await menuItemsCollection.insertOne(item);
      res.send(result);
    });

    // READ ALL
    app.get("/menuItems", async (req, res) => {
      const result = await menuItemsCollection.find().toArray();
      res.send(result);
    });

    // READ ONE
    app.get("/menuItems/:id", async (req, res) => {
      const result = await menuItemsCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // UPDATE
    app.put("/menuItems/:id", async (req, res) => {
      const updatedItem = req.body;
      const result = await menuItemsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedItem }
      );
      res.send(result);
    });

    // DELETE
    app.delete("/menuItems/:id", async (req, res) => {
      const result = await menuItemsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // CREATE
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.send(result);
    });

    // READ ALL
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    // READ ONE
    app.get("/reviews/:id", async (req, res) => {
      const result = await reviewsCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // UPDATE
    app.put("/reviews/:id", async (req, res) => {
      const updatedReview = req.body;
      const result = await reviewsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedReview }
      );
      res.send(result);
    });

    // DELETE
    app.delete("/reviews/:id", async (req, res) => {
      const result = await reviewsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.post("/user", async (req, res) => {
      const userData = req.body;
      userData.createdAt = new Date();
      const email = userData.email;
      const userExists = await usersCollection.findOne({ email });

      if (userExists) {
        return res.send({ message: "User Already Exists" });
      }

      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    // READ ALL
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // READ ONE
    app.get("/users/:id", async (req, res) => {
      const result = await usersCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // UPDATE
    app.put("/users/:id", async (req, res) => {
      const updatedUser = req.body;
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedUser }
      );
      res.send(result);
    });

    // DELETE
    app.delete("/users/:id", async (req, res) => {
      const result = await usersCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.get("/user/role", async (req, res) => {
      const email = req.query.email;

      const result = await usersCollection.findOne({ email });

      res.send({ role: result?.role || "customer" });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Restaurant is serving....");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

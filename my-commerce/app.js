const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Setup

const connect = async () => {
  const uri =
    "mongodb+srv://my-town-mart:my-town-mart@cluster0.uftoc.mongodb.net/MyCommerceDB?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const dbConnect = client.connect();
  return dbConnect;
};
const createDbAndCollections = async () => {
  const dbConnect = await connect();
  const dbName = await dbConnect.db("my-commerce-db");
  await dbName.createCollection("users");
  await dbName.createCollection("products");
  console.log("All Done");
};

const registerUser = async (user) => {
  const dbConnect = await connect();
  const users = await dbConnect.db("my-commerce-db").collection("users");

  const data = await users.insertOne(user);
  return data;
};
const getAllUsers = async (user) => {
  const dbConnect = await connect();
  const users = await dbConnect.db("my-commerce-db").collection("users");

  const data = await users.find({}).toArray();
  return data;
};
const createOnce = _.once(createDbAndCollections);
// createOnce();

//Auth Routes

app.post("/auth", async (req, res) => {
  let { email, firstName, lastName, password, confirmPassword } = req.body;

  if (!email || !firstName || !lastName || !password || !confirmPassword) {
    return res.status(400).json({
      error: {
        message: "All Fields are required",
      },
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      error: { message: "Password and confirm Password Fields must match" },
    });
  }

  password = await bcrypt.hash(password, 15);

  const body = { email, password, firstName, lastName };
  const user = await registerUser(body);
  return res.status(201).json({ user, message: "Successful" });

  //   return res.json({ message: "You have registered" });
});
app.post("/auth/login", async (req, res) => {
  return res.json({ message: "You are logged in" });
});
app.put("/auth/change-password", async (req, res) => {
  return res.json({ message: "password Changed" });
});

//Users Routes

app.get("/users", async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json({ users, count: users.length });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("Server is running on port " + PORT);
});

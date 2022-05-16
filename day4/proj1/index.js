const express = require("express");
const { join } = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://my-town-mart:my-town-mart@cluster0.uftoc.mongodb.net/EmmaDB?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// client
//   .connect()
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((err) => {
//     console.log("An error occured");
//     console.error(err);
//   });

const connectMongoDb = async (client) => {
  try {
    const cluster = await client.connect();
    // console.log(dbase);
    console.log("Connected to database");
    // const databases = await client.db().admin().listDatabases(); // list out thye databases present in the cluster
    // console.log(databases);
    const dbase = await cluster.db("BlogDB");
    // const databases = await cluster.db().admin().listDatabases();
    // console.log(databases);
    // const articleCollection = await dbase.createCollection("articles");
    // console.log("Collection created");
    // console.log(articleCollection);
    const databases = await cluster.db().admin().listDatabases();
    console.log(databases);
  } catch (error) {
    console.log("An error occured");
    console.error(error);
  }
};

// connectMongoDb(client);

const insertOne = async (item) => {
  const cluster = await client.connect();
  const articlesCollection = await cluster.db("BlogDB").collection("articles");
  const data = await articlesCollection.insertOne(item);
  return data;
};

// insertOne({ title: "My First", content: "This is just great" }).then((res) => {
//   console.log(res);
// });
// insertOne({ title: "My second", content: "This is just lovely" }).then(
//   (res) => {
//     console.log(res);
//   }
// );
const retrieveOne = async (query) => {
  const cluster = await client.connect();
  const articlesCollection = await cluster.db("BlogDB").collection("articles");
  const data = await articlesCollection.findOne(query);
  return data;
};

retrieveOne({ _id: ObjectId("628244e7c290021952b523f6") }).then((data) => {
  console.log(data);
});
const retrieveAll = async (query) => {
  const cluster = await client.connect();
  const articlesCollection = await cluster.db("BlogDB").collection("articles");
  const data = await articlesCollection.find(query).toArray();
  return data;
};
const updateOne = async (query, values) => {
  const cluster = await client.connect();
  const articlesCollection = await cluster.db("BlogDB").collection("articles");
  const data = await articlesCollection.updateOne(query, { $set: values });
  return data;
};

const main = async () => {
  const data = await updateOne(
    { _id: ObjectId("628244e7c290021952b523f6") },
    { title: "New 1", content: "New ontent", author: "Emmanuel" }
  );
  console.log(data);
};

// main();

// retrieveAll({}).then((data) => {
//   console.log(data);
// });

const users = ["Smith", "Emmanuel", "Victor", "Shalom"];
console.log(global);

const myUsers = [
  { username: "smith", age: 78 },
  { username: "George", age: 90 },
];

// {
//     id:1,title:"thyeje",content:"thsuisd"
// }
const usersCount = users.length;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(express.static(join(__dirname, "public")));
app.use((req, res, next) => {
  console.log("You're doing well");
  next();
});

app.get(
  "/",
  (req, res, next) => {
    console.log("I'm in the middle");
    next();
  },
  (req, res) => {
    res.render("index", { date: new Date(), users });
  }
);

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/profile/:name", (req, res) => {
  // querry parameter
  const { name } = req.params;
  const theUser = myUsers.find(
    (y) => y.username.toLowerCase() === name.toLowerCase()
  );
  if (theUser) {
    res.render("profile", { theUser });
  } else {
    res.render("404");
  }

  //   res.render("login");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  myUsers.push({ ...req.body, id: myUsers.length + 1 });
  console.log(myUsers);
  res.redirect("/register");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(5005, (err) => {
  if (err) {
    console.log("Something went wrong");
  } else {
    console.log("Server running on Port 5005");
  }
});

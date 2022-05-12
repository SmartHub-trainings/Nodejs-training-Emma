import express from "express";
const users = ["Smith", "Emmanuel", "Victor", "Shalom"];
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

app.get("/", (req, res) => {
  res.render("index", { date: new Date(), users });
});

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

app.listen(5000, (err) => {
  if (err) {
    console.log("Something went wrong");
  } else {
    console.log("Server running on Port 5000");
  }
});

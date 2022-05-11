// const { createServer } = require("http");
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const user = { nAME: "SMIITH", age: 89 };

const port = 5000;
// console.log(http.STATUS_CODES);
http
  .createServer(async (req, res) => {
    console.log(req.method);
    if (req.method === "GET") {
      if (req.url === "/") {
        //   res.end("You're on the home page");
        //   res.end("<h1>You're on the home page</h1>");
        console.log(path.join(__dirname, "views", "index.html"));
        const data = await fs.readFile(
          path.join(__dirname, "views", "index.html")
        );
        res.writeHead(200, "Ok", { "Content-type": "text/html" });

        res.write(data);
        res.end();
      } else if (req.url === "/profile") {
        // res.writeHead(200, "Ok", { "Content-type": "application/json" });

        res.write(JSON.stringify(user));
        res.end();
      } else if (req.url === "/about") {
        res.write("Welcome to the about page");
        res.write("Welcome to the about page");

        res.end();

        //   res.end("Welcome to the about page");
      } else {
        res.end("Page not Found");
      }
    } else if (req.method === "POST") {
      if (req.url === "/save") {
        res.end("You want to save a content");
      }
    }
  })
  .listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server is running at http://localhost:${port}`);
    }
  });

// const th = { name: "Smith", age: 56 };

// let name=th.name
// let age = th.age
// let { name, age } = th;
// console.log(name);
// console.log(age);
// console.log(th);
// let { name: fullname, age: theAge } = th;
// console.log(fullname);
// console.log(th);

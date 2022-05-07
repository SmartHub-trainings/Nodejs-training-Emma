const fs = require("fs");

const print = console.log;

// print(fs);

// fs.writeFileSync("./first.txt", "This is what i want and more!!");
// fs.writeFileSync("./index2.js", "console.log(`i'm here`)\nlet a =12;");

// fs.appendFileSync("./first2.txt", "\njust started");
// const data = fs.readFileSync("./first.txt");
// fs.writeFileSync("./tt.txt", `This is what i got "${data}"`);

// fs.readFile("./first.txt", (err, content) => {
//   print(content);
//   print(err);
//   print();
//   print();
//   if (err) {
//     print(err);
//   } else {
//     print(content);
//   }
// });

// fs.readFile("./first.txt", "ascii", (err, content) => {
//   //   print(content);
//   //   print(err);
//   print();
//   print();
//   if (err) {
//     // print(err);
//     print("Something went wrong");
//   } else {
//     print(content);
//   }
// });

fs.mkdir("./my-things", (err) => {
  if (err) {
    print("error");
  } else {
    fs.readFile("./first.txt", "utf-8", (err, content) => {
      fs.writeFile("./my-things/second.txt", content, (err) => {
        fs.unlink("./first.txt", (err) => {
          print("All done");
        });
      });
    });
  }
});

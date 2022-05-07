const fs = require("fs").promises;

// fs.writeFile("./first.txt", "This is what i want and more!!")
//   .then((data) => {})
//   .catch((err) => {});

// fs.mkdir("./my-things", (err) => {
//   if (err) {
//     print("error");
//   } else {
//     fs.readFile("./first.txt", "utf-8", (err, content) => {
//       fs.writeFile("./my-things/second.txt", content, (err) => {
//         fs.unlink("./first.txt", (err) => {
//           print("All done");
//         });
//       });
//     });
//   }
// });

fs.mkdir("./my-thingsss")
  .then(() => {
    fs.readFile("./first.txt").then((data) => {
      fs.writeFile("./my-thingsss/second.txt", data).then(() => {
        fs.unlink("./first.txt").then(() => {
          console.log("All Done");
        });
      });
    });
  })
  .catch((err) => {
    console.log("erro");
  });

(async () => {
  await fs.mkdir("./my-thoughts");
  const data = await fs.readFile("first2.txt");
  await fs.writeFile("./my-thoughts/tt.txt", data);
  await fs.unlink("./first2.txt");
  console.log("All Good");
})();

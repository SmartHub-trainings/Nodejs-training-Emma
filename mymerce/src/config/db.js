const mongoose = require("mongoose");
module.exports = (req, res, next) => {
  const uri =
    "mongodb+srv://my-town-mart:my-town-mart@cluster0.uftoc.mongodb.net/MyCommerceDB?retryWrites=true&w=majority";
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DataBASE CONNECTED");
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

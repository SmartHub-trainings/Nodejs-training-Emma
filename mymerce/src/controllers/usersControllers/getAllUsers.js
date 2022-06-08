const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const query = req.query;
    // console.log(query);
    const users = await User.find({}).sort({
      createdAt: query.date_sort == 0 ? -1 : 1,
    });
    // const users = await User.find({}).sort({ firstName: 1 });

    // .sort({createdAt:-1})
    return res.status(200).json(users);
  } catch (error) {
    console.log(err);
  }
};

const router = require("express").Router();

const register = require("../controllers/authControls/register");
const getAllUsers = require("../controllers/usersControllers/getAllUsers");

// router.get("/", getAllProducts);
// router.post("/", register);
router.get("/", getAllUsers);

module.exports = router;

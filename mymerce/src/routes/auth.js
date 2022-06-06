const router = require("express").Router();

const login = require("../controllers/authControls/login");
const register = require("../controllers/authControls/register");

// router.get("/", getAllProducts);
router.post("/", register);
router.post("/login", login);

module.exports = router;

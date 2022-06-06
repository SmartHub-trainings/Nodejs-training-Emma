const router = require("express").Router();
const userIsAthenticated = require("../middlewares/userIsAuthenticated");

const upload = require("../config/multer.config");
const addNewproduct = require("../controllers/productsControllers/addNewproduct");
const getAllProducts = require("../controllers/productsControllers/getAllProducts");

router.get("/", getAllProducts);
router.post("/", userIsAthenticated, upload.single("image"), addNewproduct);

module.exports = router;

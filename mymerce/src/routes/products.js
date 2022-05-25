const router = require("express").Router();

const addNewproduct = require("../controllers/productsControllers/addNewproduct");
const getAllProducts = require("../controllers/productsControllers/getAllProducts");

router.get("/", getAllProducts);
router.post("/", addNewproduct);

module.exports = router;

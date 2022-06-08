const router = require("express").Router();
const userIsAthenticated = require("../middlewares/userIsAuthenticated");

const upload = require("../config/multer.config");
const addNewproduct = require("../controllers/productsControllers/addNewproduct");
const getAllProducts = require("../controllers/productsControllers/getAllProducts");
const addAReview = require("../controllers/productsControllers/addAReview");

router.get("/", getAllProducts);
router.post("/", userIsAthenticated, upload.single("image"), addNewproduct);
router.patch("/reviews/:id", userIsAthenticated, addAReview);

module.exports = router;

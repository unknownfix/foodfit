const functions = require("firebase-functions");
const regFuntions = functions.region("europe-west3");
const auth = require("./utils/auth");

const { loginUser, signUpUser } = require("./APIs/users");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("./APIs/products");

const app = require("express")();
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.get("/products", auth, getProducts);
app.post("/product", auth, createProduct);

exports.api = regFuntions.https.onRequest(app);

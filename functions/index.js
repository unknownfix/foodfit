const functions = require("firebase-functions");
const regFuntions = functions.region("europe-west3");
const auth = require("./utils/auth");

const {
  loginUser,
  signUpUser,
  getUser,
  getSettings,
  setSettings,
} = require("./APIs/users");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("./APIs/products");

const {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
} = require("./APIs/meals");

const app = require("express")();
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.get("/user", auth, getUser);
app.get("/user/settings", auth, getSettings);
app.post("/user/settings", auth, setSettings);
app.get("/products", auth, getProducts);
app.post("/product", auth, createProduct);
app.delete("/product/:productId", auth, deleteProduct);
app.get("/meals/:date", auth, getMeals);
app.post("/meal", auth, createMeal);
app.put("/meal/:id", auth, updateMeal);
app.delete("/meal/:id", auth, deleteMeal);

exports.api = regFuntions.https.onRequest(app);

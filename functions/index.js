const functions = require("firebase-functions");
const cors = require("cors");
const regFuntions = functions;
//const regFuntions = functions.region("europe-west3");

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
app.use(cors({ origin: true }));
app.post("/api/login", loginUser);
app.post("/api/signup", signUpUser);
app.get("/api/user", auth, getUser);
app.get("/api/user/settings", auth, getSettings);
app.post("/api/user/settings", auth, setSettings);
app.get("/api/products", auth, getProducts);
app.post("/api/product", auth, createProduct);
app.delete("/api/product/:productId", auth, deleteProduct);
app.get("/api/meals/:date", auth, getMeals);
app.post("/api/meal", auth, createMeal);
app.put("/api/meal/:id", auth, updateMeal);
app.delete("/api/meal/:id", auth, deleteMeal);

exports.api = regFuntions.https.onRequest(app);

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

const app = require("express")();
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.get("/user", auth, getUser);
app.get("/user/settings", auth, getSettings);
app.post("/user/settings", auth, setSettings);

exports.api = regFuntions.https.onRequest(app);

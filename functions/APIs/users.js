const { admin, db } = require("../utils/admin");
const config = require("../utils/config");

const firebase = require("firebase");

firebase.initializeApp(config);

const {
  validateLoginData,
  validateSignUpData,
  validateSettingsData,
} = require("../utils/validators");

exports.loginUser = async (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return response.status(400).json(errors);

  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
    const token = await data.user.getIdToken();

    const doc = await db.doc(`/users/${user.email}`).get();
    const user_data = {
      email: doc.data().email,
      settings: doc.data().settings,
    };

    return response.json({ token: token, user: user_data });
  } catch (error) {
    return response
      .status(403)
      .json({ common: "wrong credentials, please try again" });
  }
};

exports.signUpUser = (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = validateSignUpData(newUser);

  if (!valid) return response.status(400).json(errors);

  let token, userId;

  let userData = {};

  db.doc(`/users/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response.status(400).json({ email: "Email already in use" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      userData = {
        email: newUser.email,
        createdAt: new Date().toISOString(),
        settings: {
          activity: null,
          gender: null,
          goal: null,
          age: null,
          height: null,
          weight: null,
        },
        userId,
      };
      return db.doc(`/users/${newUser.email}`).set(userData);
    })
    .then(() => {
      return response.status(201).json({
        token,
        user: { email: userData.email, settings: userData.settings },
      });
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email already in use" });
      } else {
        return response.status(400).json({ common: err.message });
      }
    });
};

exports.getUser = (request, response) => {
  db.doc(`/users/${request.user.email}`)
    .get()
    .then((doc) => {
      return response.json({
        email: doc.data().email,
        settings: doc.data().settings,
      });
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};

exports.getSettings = (request, response) => {
  db.collection("calc")
    .get()
    .then((snapshot) => {
      let items = {};
      snapshot.forEach(
        (doc) =>
          (items[doc.id] = {
            ...doc.data(),
          }),
      );
      return response.json(items);
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};

exports.setSettings = (request, response) => {
  const userSettings = {
    activity: request.body.activity,
    gender: request.body.gender,
    goal: request.body.goal,
    age: request.body.age,
    height: request.body.height,
    weight: request.body.weight,
  };
  const { valid, errors } = validateSettingsData(userSettings);

  if (!valid) return response.status(400).json(errors);

  db.collection("users")
    .doc(request.user.email)
    .update({ settings: userSettings })
    .then((snapshot) => response.json(userSettings))
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};

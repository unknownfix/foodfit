const { db } = require("../utils/admin");
const {
  validateUpdateProduct,
  validateUpdateMeal,
} = require("../utils/validators");

exports.getMeals = (request, response) => {
  db.collection("meals")
    .orderBy("createdAt", "asc")
    .where("date", "==", request.params.date)
    .where("userId", "==", request.user.uid)
    .get()
    .then((snapshot) => {
      let items = [];
      snapshot.forEach((doc) =>
        items.push({
          id: doc.id,
          name: doc.data().name,
          protein: doc.data().protein,
          fat: doc.data().fat,
          carbs: doc.data().carbs,
          weight: doc.data().weight,
        }),
      );
      return response.json(items);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.createMeal = (request, response) => {
  const meal = {
    name: request.body.name,
    protein: request.body.protein,
    fat: request.body.fat,
    carbs: request.body.carbs,
    weight: request.body.weight,
    userId: request.user.uid,
    date: new Date().toISOString().substring(0, 10),
    createdAt: new Date().toISOString(),
  };

  const { valid, errors } = validateUpdateProduct(meal, "meal");
  if (!valid) return response.status(400).json(errors);

  db.collection("meals")
    .add(meal)
    .then((doc) => {
      const responseItem = meal;
      responseItem.id = doc.id;
      return response.json(responseItem);
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};

exports.updateMeal = (request, response) => {
  const meal = {
    weight: request.body.weight,
  };

  const { valid, errors } = validateUpdateMeal(meal);
  if (!valid) return response.status(400).json(errors);

  db.collection("meals")
    .doc(request.params.id)
    .update(meal)
    .then((snapshot) => {
      return response.json(snapshot);
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};

exports.deleteMeal = (request, response) => {
  const document = db.doc(`/meals/${request.params.id}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Meal not found" });
      }

      return document.delete();
    })
    .then(() => {
      response.json({ message: "Delete successfull" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

const { db } = require("../utils/admin");

exports.getProducts = (request, response) => {
  db.collection("products")
    .orderBy("name", "asc")
    .get()
    .then((snapshot) => {
      let items = [];
      snapshot.forEach((doc) =>
        items.push({
          id: doc.id,
          name: doc.data().name,
          protein: doc.data().protein,
          fat: doc.data().fat,
          carbs: doc.data().protein,
        }),
      );
      return response.json(items);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.createProduct = (request, response) => {
  if (request.body.name.trim() === "") {
    return response.status(400).json({ name: "Must not be empty" });
  }

  //TODO:: add validation

  const newItem = {
    name: request.body.name,
    protein: request.body.protein,
    fat: request.body.fat,
    carbs: request.body.carbs,
    createdAt: new Date().toISOString(),
  };
  db.collection("products")
    .add(newItem)
    .then((doc) => {
      const responseItem = newItem;
      responseItem.id = doc.id;
      return response.json(responseItem);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

exports.deleteProduct = (request, response) => {
  const document = db.doc(`/products/${request.params.productId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Product not found" });
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

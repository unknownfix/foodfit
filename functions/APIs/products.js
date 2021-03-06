const { db } = require("../utils/admin");
const { validateUpdateProduct } = require("../utils/validators");

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
          carbs: doc.data().carbs,
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
  const product = {
    name: request.body.name,
    protein: request.body.protein,
    fat: request.body.fat,
    carbs: request.body.carbs,
    userId: request.user.uid,
    createdAt: new Date().toISOString(),
  };

  const { valid, errors } = validateUpdateProduct(product);
  if (!valid) return response.status(400).json(errors);

  db.collection("products")
    .add(product)
    .then((doc) => {
      const responseItem = product;
      responseItem.id = doc.id;
      return response.json(responseItem);
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
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

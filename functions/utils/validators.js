const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateLoginData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be  empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be valid email address";
  }

  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSettingsData = (data) => {
  let errors = {};

  if (typeof data.activity !== "number") {
    errors.activity = "Must be number";
  }
  if (typeof data.gender !== "number") {
    errors.gender = "Must be number";
  }
  if (typeof data.goal !== "number") {
    errors.goal = "Must be number";
  }
  if (typeof data.age !== "number") {
    errors.goal = "Must be number";
  }
  if (typeof data.height !== "number") {
    errors.goal = "Must be number";
  }
  if (typeof data.weight !== "number") {
    errors.goal = "Must be number";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateUpdateProduct = (data, type = "product") => {
  let errors = {};

  if (isEmpty(data.name)) errors.name = "Must not be empty";

  if (typeof data.protein !== "number") {
    errors.activity = "Must be number";
  }
  if (typeof data.fat !== "number") {
    errors.gender = "Must be number";
  }
  if (typeof data.carbs !== "number") {
    errors.goal = "Must be number";
  }

  if (type === "meal") {
    if (typeof data.weight !== "number") {
      errors.weight = "Must be number";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateUpdateMeal = (data) => {
  let errors = {};

  if (typeof data.weight !== "number") {
    errors.weight = "Must be number";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSettingsData;

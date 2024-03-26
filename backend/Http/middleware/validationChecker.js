const { validationResult } = require("express-validator");

const validationChecker = async (validations, req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.handler.validationError({ errors: errors.array() });
  }
};

module.exports = validationChecker;

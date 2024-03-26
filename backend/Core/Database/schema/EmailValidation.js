const { model, Schema } = require("mongoose");

const EmailValidationSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  uniqueCode: {
    type: String,
    required: true,
    unique: true,
  },
  reason: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

const EmailValidation = model("emailValidations", EmailValidationSchema);

module.exports = EmailValidation;

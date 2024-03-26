const { model, Schema } = require("mongoose");
const Encrypt = require("../../Services/Encrypt");
const { getAgeFromBirthDate } = require("../../utility/UserUtility");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    zip: {
      type: String,
      require: true,
      max: 6,
    },
    miles: {
      type: Number,
      require: true,
    },
    gender: {
      type: String,
      require: true,
      enum: ["male", "female", "nonBinary", "preferNotToSay"],
    },
    lookingFor: {
      type: String,
      require: true,
      enum: ["male", "female", "nonBinary", "any"],
    },
    birthDate: { type: Date, require: true },
    age: { type: Number, require: true },
    interests: { type: Array, required: true },
    habits: { type: Array, required: true },
    ageRange: {
      type: [Number, Number],
      require: true,
    },
    isEmailVerified: {
      type: Boolean,
      require: true,
      default: false,
    },
    images: [
      {
        src: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await Encrypt.createEnryption(this.password);
    this.age = await getAgeFromBirthDate(this.birthDate);
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = model("users", UserSchema);

module.exports = { User, UserSchema };

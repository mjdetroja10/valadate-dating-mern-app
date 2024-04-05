const moment = require("moment");
const { UserSchema, EmailVerificationSchema } = require("../Database/schema");
const MailService = require("../Services/MailService");

const { v4: uuidv4 } = require("uuid");
const Encrypt = require("../Services/Encrypt");
const RequestModel = require("./RequestModel");

let valdateUrl = process.env.VALADATE_WEB_URL;

class UserModel {
  static async createNew(data) {
    const user = await UserSchema.create(data);

    user.save();

    return user;
  }

  static async getByEmail(email) {
    return await UserSchema.findOne({ email: email });
  }

  static async getById(id) {
    let user = null;

    try {
      user = await UserSchema.findById(id);
    } catch (error) {}

    return user;
  }

  static async updateEmailStatus(email) {
    let filter = { email: email };
    return await UserSchema.findOneAndUpdate(filter, { isEmailVerified: true });
  }

  static async forgotPassword(user) {
    let uniqueCode = uuidv4();

    let mailData = {
      to: user.email,
      subject: "Valadate : forget password",
      html: {
        firstName: user.firstName,
        lastName: user.lastName,
        url: `${valdateUrl}/reset-password/${uniqueCode}`,
        reason: "reset your password",
      },
    };

    const mail = await MailService.send(mailData);

    if (!mail) return;

    let emailData = {
      userEmail: user.email,
      uniqueCode: uniqueCode,
      reason: "resetPassword",
      expiredAt: moment().add(24 * 60, "minute"),
    };

    let email = await EmailVerificationSchema.create(emailData);

    email.save();

    return email;
  }

  static async resetPassword(email, password) {
    let hashedPassword = await Encrypt.createEnryption(password);

    const user = await UserSchema.updateOne({ email: email }, { password: hashedPassword });
  }

  static async getAllDiscover(user, pagination = {}) {
    let sentReqUsers = await RequestModel.getRecieverById(user._id);

    let filtereId = [...new Set(sentReqUsers.flatMap((x) => [x.recieverId, x.senderId]))];

    let lookingFor =
      user?.lookingFor === "any"
        ? { $in: ["male", "female", "nonBinary", "preferNotToSay"] }
        : { $eq: user.lookingFor };

    let filter = {
      $and: [
        { email: { $ne: user?.email } }, // users list without login user
        { gender: lookingFor },
        { _id: { $nin: filtereId } },
      ],
    };

    let users = await UserSchema.find(filter, { password: 0 })
      .sort([["createdAt", -1]])
      .limit(pagination.limit)
      .skip(pagination.skip);

    return users;
  }

  static async getSingleUser(reqId) {
    let condition = { $and: [{ _id: { $eq: reqId } }] };

    return await UserSchema.findOne({ ...condition }, { password: 0 });
  }
}

module.exports = UserModel;

// for convert into objectId mongoose.Types.ObjectId; // true

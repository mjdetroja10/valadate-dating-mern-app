const { ObjectId } = require("mongodb");
const { EmailVerificationSchema } = require("../Database/schema");

class EmailVerifyModel {
  static async createNew(mail) {
    let email = await EmailVerificationSchema.create(mail);
    email.save();

    return email;
  }

  static async findByCode(code) {
    return await EmailVerificationSchema.findOne({ uniqueCode: code });
  }

  static async deleteById(id) {
    let deleteEmail = await EmailVerificationSchema.findByIdAndDelete(id);

    return deleteEmail;
  }
}

module.exports = EmailVerifyModel;

const { v4: uuidv4 } = require("uuid");

const MailService = require("../Services/MailService");

const { EmailVerifyModel } = require("../Models");
const { mailSentData, emailVerify } = require("../utility/MailUtility");

class EmailVerifyRepository {
  static async userEmailVerify(user) {
    let uniqueCode = uuidv4();

    // let sendMail = modifySendMail(user, mailSentData.emailVerify(uniqueCode));
    let sendMail = mailSentData.emailVerify(user, uniqueCode);

    let mailSent = await MailService.send(sendMail);

    if (!mailSent) return null;

    let emailData = emailVerify(user.email, uniqueCode, "emailVerification");
    return await EmailVerifyModel.createNew(emailData);
  }

  static async userForgotPassword(user) {
    let uniqueCode = uuidv4();

    // let sendMail = modifySendMail(user, mailSentData.resetPassword(uniqueCode));
    let sendMail = mailSentData.resetPassword(user, uniqueCode);
    const mail = await MailService.send(sendMail);

    if (!mail) return;

    let emailData = emailVerify(user.email, uniqueCode, "resetPassword");
    return await EmailVerifyModel.createNew(emailData);
  }

  static async deleteMailById(id) {
    return await EmailVerifyModel.deleteById(id);
  }
}

module.exports = EmailVerifyRepository;

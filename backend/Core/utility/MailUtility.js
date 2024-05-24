const moment = require("moment");

let valdateUrl = process.env.VALADATE_WEB_URL;

const mailSentData = {
  emailVerify: (user, uniqueCode) => ({
    to: user.email,
    subject: "Valadate - verify email",
    html: {
      name: `${user?.firstName} ${user?.lastName}`,
      url: `${valdateUrl}/email-verify/${uniqueCode}`,
      reason: "verify your email",
    },
  }),
  resetPassword: (user, uniqueCode) => ({
    to: user.email,
    subject: "Valadate - forget password",
    html: {
      name: `${user?.firstName} ${user?.lastName}`,
      url: `${valdateUrl}/reset-password/${uniqueCode}`,
      reason: "reset your password",
    },
  }),
};

const emailVerify = (userEmail, uniqueCode, reason) => ({
  userEmail,
  uniqueCode,
  reason,
  expiredAt: moment().add(24 * 60, "minute"),
});

module.exports = { mailSentData, emailVerify };

const { UserRepository } = require("../../../Core/Repository");
const Encrypt = require("../../../Core/Services/Encrypt");

const ensureAuthenticated = async (req, res, nxt) => {
  try {
    let success = false;

    if ("authorization" in req.headers && req.headers.authorization.length > 0) {
      if (req.headers.authorization.split(" ")[0] === "Bearer" && req.headers.authorization.split(" ")[1].length > 0) {
        let decode;
        try {
          decode = await Encrypt.verifyJwt(req.headers.authorization.split(" ")[1]);

          let user = await UserRepository.getUserById(decode.id);

          if (user?.id === decode?.id) {
            req.accessingUser = user;
            success = true;
          }
        } catch (e) {}
      }
    }

    if (!success) {
      return res.handler.unAuthorized({ forceLogout: true });
    }
    return nxt();
  } catch (error) {
    res.handler.serverError(error);
  }
};

module.exports = ensureAuthenticated;

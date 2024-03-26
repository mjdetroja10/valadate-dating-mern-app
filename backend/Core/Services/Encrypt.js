const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = process.env.SALT_ROUND;
const jwtSecretKey = process.env.JWT_SECRET;

class Encrypt {
  static async createEnryption(password) {
    console.log(saltRound, "saltRound");
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(saltRound)));
  }

  static async compareEncyption(password, hashPassword) {
    return await bcrypt.compareSync(password, hashPassword);
  }

  static async generateJwt(data) {
    let token = await jwt.sign(data, jwtSecretKey, { expiresIn: "24h" });

    return token;
  }

  static async verifyJwt(token) {
    return await jwt.verify(token, jwtSecretKey);
  }
}

module.exports = Encrypt;

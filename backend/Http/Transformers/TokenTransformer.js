class TokenTransformer {
  static async tokenAttr(data) {
    let attr = ["id", "firstName", "lastName", "email", "gender", "images", "interests"];

    let tokenData = {};

    for (let i = 0; i < attr.length; i++) {
      const element = attr[i];
      if (data[element]) tokenData[element] = data[element];
    }

    return tokenData;
  }
}
module.exports = TokenTransformer;

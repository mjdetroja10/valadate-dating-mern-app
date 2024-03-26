const { RequestModel } = require("../Models");

class RequestRepository {
  static async createRequest(req) {
    return await RequestModel.sendReq(req);
  }

  static async isRequestAvailable(body) {
    return await RequestModel.isRecieverAvalaible(body);
  }

  static async isFriendAvailbale(body) {
    return await RequestModel.isFriendReqAvalaible(body);
  }

  static async getPendingRequestList(user) {
    return await RequestModel.pendingRequest(user);
  }

  static async requestHandling(params) {
    return await RequestModel.reqHandler(params);
  }
}

module.exports = RequestRepository;

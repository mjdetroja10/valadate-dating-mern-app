const { RequestRepository, FriendRepository } = require("../../Core/Repository");

class RequestController {
  static async sendRequest(req, res) {
    try {
      let isReqAvalaible = await RequestRepository.isRequestAvailable(req.body);
      if (isReqAvalaible) return res.handler.validationError("request is already available");

      if (req.reciever) {
        if ("status" in req.body) {
          let sentReq = await RequestRepository.createRequest(req.body);

          return res.handler.success(sentReq);
        }
      }
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async pendingRequestList(req, res) {
    try {
      if (req?.accessingUser) {
        let pendingReq = await RequestRepository.getPendingRequestList(req.accessingUser);

        res.handler.success(pendingReq);
      }
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async requestConfirmation(req, res) {
    try {
      let success = false;

      let isFriendReqAvalaible = await RequestRepository.isFriendAvailbale(req.body);
      let isAlreadyFrd = await FriendRepository.isFriend(req.body);

      if (isAlreadyFrd || !isFriendReqAvalaible) {
        let msg = !isFriendReqAvalaible ? "request is not available" : isAlreadyFrd ? "already a friend" : "";
        return res.handler.validationError(msg);
      }

      if (req?.accessingUser && isFriendReqAvalaible) {
        success = await RequestRepository.requestHandling(req.body);
      }

      if (success) res.handler.success(success);
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async myFriends(req, res) {
    try {
      if (req?.accessingUser) {
        let frds = await FriendRepository.myFriendList(req?.accessingUser._id);
        res.handler.success(frds);
      }
    } catch (error) {
      res.handler.serverError(error);
    }
  }
}

module.exports = RequestController;

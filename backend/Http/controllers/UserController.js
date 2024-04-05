const UserModel = require("../../Core/Models/UserModel");
const fs = require("fs");
const IP = require("ip");
const { UserRepository } = require("../../Core/Repository");

const ipAddress = IP.address();

class UserController {
  static async createUser(req, res) {
    try {
      if (!req?.existUser) {
        await UserRepository.newUser(req);
        return res.handler.success(null, "user created successfully");
      }
      res.handler.notFound();
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async allUsers(req, res) {
    try {
      if (req?.accessingUser) {
        let users = await UserRepository.getAllUsers(req?.accessingUser, req.query.pagination);
        return res.handler.success(users);
      }
      return res.handler.serverError(null, "something went wrong");
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async singleUser(req, res) {
    try {
      if (req?.accessingUser && req.params?.id) {
        let user = await UserRepository.getSingleUser(req.params?.id);
        return res.handler.success(user);
      }
      return res.handler.serverError(null, "something went wrong");
    } catch (error) {
      res.handler.serverError(error);
    }
  }
}
module.exports = UserController;

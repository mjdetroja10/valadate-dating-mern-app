const ensureAuthenticated = require("../middleware/auth/ensureAuthenticated");

const appRouter = (app) => {
  app.use("/", require("./auth"));

  app.use("/auth", ensureAuthenticated, require("./protected-routes"));

  app.all("*", (req, res) => {
    res.handler.notFound();
  });
};

module.exports = appRouter;

class UserRouter {
  constructor() {
    const UserController = require("./UserController");
    this.controller = new UserController();
  }

  applyRouting(router) {
    router.get("/", (request, response, next) => {
      this.controller.getUsers(request, response, next);
    });

    router.get("/:id", (request, response, next) => {
      this.controller.getUser(request, response, next);
    });

    router.post("/", (request, response, next) => {
      this.controller.createUser(request, response, next);
    });

    // TODO:
    //   - Implement a delete request.
    //   - Implement a put request.

    return router;
  }
}

module.exports = UserRouter;

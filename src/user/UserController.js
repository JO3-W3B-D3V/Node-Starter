class UserController {
  constructor() {
    const UserService = require("./UserService");
    this.service = new UserService();
  }

  async getUsers(request, response) {
    let header = "application/json";
    let status = 200;
    let data = null;

    try {
      const page = request.query.page == null ? 1 : request.query.page;
      const numberOfPages = await this.service.getTotalNumberOfPages();

      if (page > numberOfPages) {
        header = "text/plain";
        data = "No users found on the page " + page;
        status = 404;
      } else {
        data = {
          results: await this.service.getUsersByPage(page),
          pages: numberOfPages,
        };
      }
    } catch (exception) {
      console.error(exception);
      status = 400;
      header = "text/plain";
      data = "Invalid parameters provided";
    }

    response.setHeader("Content-Type", header);
    response.status(status);
    response.send(data);
  }

  async getUser(request, response) {
    let header = "application/json";
    let status = 200;
    let data = null;

    try {
      const id = request.params.id;
      data = await this.service.getUserById(id);

      if (data == null) {
        header = "text/plain";
        data = "No user found with the id of " + id;
        status = 404;
      }
    } catch (exception) {
      console.error(exception);
      status = 400;
      header = "text/plain";
      data = "Invalid parameters provided";
    }

    response.setHeader("Content-Type", header);
    response.status(status);
    response.send(data);
  }

  async createUser(request, response) {
    let header = "application/json";
    let status = 200;
    let data = null;
    let requestInvalid = false;

    try {
      const requestBody = request.body;
      const contentType = request.headers["content-type"];

      if (contentType != "application/json") {
        data = "Unsupported media type";
        status = 415;
        header = "text/plain";
        requestInvalid = true;
        throw new Error(data);
      }

      await this.service.createUser(requestBody);
      status = 201;
      header = "text/plain";
    } catch (exception) {
      console.error(exception);
      if (!requestInvalid) {
        status = 400;
        header = "text/plain";
        data = "Invalid parameters provided";
      }
    }

    response.setHeader("Content-Type", header);
    response.status(status);
    response.send(data);
  }
}

module.exports = UserController;

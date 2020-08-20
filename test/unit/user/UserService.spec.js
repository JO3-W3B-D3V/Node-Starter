const Application = require("../../../src/Application");
const UserService = require("../../../src/user/UserService");

describe("UserService tests", () => {
  let service = null;

  beforeEach(() => {
    process.env["ENV"] = "test";
    service = new UserService();
    Application.init();
  });

  test("It should throw an exception for null id", () => {
    expect(() => service.getUserById(null)).toThrow(Error);
  });

  test("It should throw an exception for an isNaN id", () => {
    expect(() => service.getUserById("tes")).toThrow(Error);
  });

  test("It should throw an exception for an id that's <= 0", () => {
    expect(() => service.getUserById(0)).toThrow(Error);
  });

  test("It should throw an exception for null page", () => {
    expect(() => service.getUsersByPage(null)).toThrow(Error);
  });

  test("It should throw an exception for an isNaN page", () => {
    expect(() => service.getUsersByPage("tes")).toThrow(Error);
  });

  test("It should throw an exception for a page that's <= 0", () => {
    expect(() => service.getUsersByPage(0)).toThrow(Error);
  });

  test("It should throw an exception for a null user", () => {
    expect(() => service.createUser(null)).toThrow(Error);
  });

  test("It should throw an exception for an invalid data type", () => {
    expect(() => service.createUser(9)).toThrow(Error);
  });

  test("It should throw an exception for a user with a null forename", () => {
    const testUser = {
      forename: null,
      surname: "Po",
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a short forename", () => {
    const testUser = {
      forename: "J",
      surname: "Po",
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a forename of the wrong data type", () => {
    const testUser = {
      forename: 99,
      surname: "Po",
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a forname that's just white space", () => {
    const testUser = {
      forename: "   J ",
      surname: "Po",
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a long forename", () => {
    const testUser = {
      forename:
        "Jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
      surname: "Po",
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a null surname", () => {
    const testUser = {
      forename: "Joe",
      surname: null,
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a short surname", () => {
    const testUser = {
      forename: "Joe",
      surname: "B",
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a surname of the wrong data type", () => {
    const testUser = {
      forename: "Joe",
      surname: 99,
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a surname that's just white space", () => {
    const testUser = {
      forename: "Joe",
      surname: "  B   ",
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });

  test("It should throw an exception for a user with a long surname", () => {
    const testUser = {
      forename: "Joe",
      surname: "Blogggggggggggggggggggggggggggssssssssssssssssssssssssssssssss",
    };
    expect(() => service.createUser(testUser)).toThrow(Error);
  });
});

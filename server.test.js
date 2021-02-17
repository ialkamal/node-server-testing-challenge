const request = require("supertest");
const server = require("./server");

describe("Test Request Handlers", () => {
  let response;
  test("GET /projects check data", () => {
    return request(server)
      .get("/projects")
      .then((res) => {
        response = res;
        expect(response.body).toHaveLength(3);
      });
  });
  test("GET /projects check status", () => {
    return request(server)
      .get("/projects")
      .then((res) => {
        response = res;
        expect(response.status).toBe(200);
      });
  });
  test("POST /projects check data", () => {
    const project = { name: "Test Project 1", isCompleted: false };
    return request(server)
      .post("/projects")
      .send(project)
      .then((res) => {
        response = res;
        expect(JSON.parse(response.text)).toHaveLength(4);
      });
  });
  test("POST /projects check status", () => {
    const project = { name: "Test Project 2", isCompleted: true };
    return request(server)
      .post("/projects")
      .send(project)
      .then((res) => {
        response = res;
        expect(response.status).toBe(201);
      });
  });
  test("POST /projects check status missing project name", () => {
    const project = { isCompleted: true };
    return request(server)
      .post("/projects")
      .send(project)
      .then((res) => {
        response = res;
        expect(response.status).toBe(401);
      });
  });
  test("POST /projects check status missing isComplete", () => {
    const project = { name: "Test Project 3" };
    return request(server)
      .post("/projects")
      .send(project)
      .then((res) => {
        response = res;
        expect(response.status).toBe(201);
      });
  });
  test("POST /projects check default isComplete value if missing isComplete in request", () => {
    const project = { name: "Test Project 4" };
    return request(server)
      .post("/projects")
      .send(project)
      .then((res) => {
        response = res;
        const prjs = JSON.parse(response.text);
        expect(prjs[prjs.length - 1].isCompleted).toBe(false);
      });
  });
  test("DELETE /projects check return value if id exists", () => {
    return request(server)
      .delete("/projects/1")
      .then((res) => {
        response = res;
        expect(JSON.parse(response.text).id).toBe(1);
      });
  });
  test("DELETE /projects check status if id exists", () => {
    return request(server)
      .delete("/projects/2")
      .then((res) => {
        response = res;
        expect(response.status).toBe(200);
      });
  });
  test("DELETE /projects check status if id does not exist", () => {
    return request(server)
      .delete("/projects/2")
      .then((res) => {
        response = res;
        expect(response.status).toBe(404);
      });
  });
});

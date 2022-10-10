import request from "supertest";
import { app } from "../../src/app";
// import { defaultRoute } from "../../src/routes/DefaultRouter";


  test("index route works",  (done) => {
    jest.setTimeout(7000);
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({ status: 200,message: "hello" })
      .expect(200,done);
  });
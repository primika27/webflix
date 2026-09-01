import request from "supertest";
import express from "express";
import { AppDataSource } from "../src/data-source";
import locationRoutes from "../src/routes/locationRoutes";

describe("Location", () => {
  let app: any;

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    app = express();
    app.use(express.json());
    app.use("/location", locationRoutes);
  });

  it("client inexistant", async () => {
    const response = await request(app)
      .post("/location/rent")
      .send({ idClient: 999999, idFilm: 1 });
    
    expect(response.status).toBe(200);
  });

  it("body vide", async () => {
    const response = await request(app)
      .post("/location/rent")
      .send({});
    
    expect(response.status).toBe(400);
  });
});


import request from "supertest";
import express from "express";
import { AppDataSource } from "../src/data-source";
import filmRoutes from "../src/routes/filmRoutes";

describe("Films", () => {
  let app: any;

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    app = express();
    app.use(express.json());
    app.use("/films", filmRoutes);
  });

  it("copies disponibles", async () => {
    const response = await request(app).get("/films/availableCopies").query({ idFilm: 1 });
    expect(response.status).toBe(200);
  });
});


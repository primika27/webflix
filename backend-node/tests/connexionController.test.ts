import request from "supertest";
import express from "express";
import { AppDataSource } from "../src/data-source";
import connexionRoutes from "../src/routes/connexionRoutes";

describe("Connexion", () => {
  let app: any;

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    app = express();
    app.use(express.json());
    app.use("/connexion", connexionRoutes);
  });

  it("connexion valide", async () => {
    const response = await request(app)
      .post("/connexion")
      .send({
        email: "AndrewDLehmann79@gmail.com",
        password: "tahva9jieHe0",
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("connexion invalide", async () => {
    const response = await request(app)
      .post("/connexion")
      .send({
        email: "faux@email.com",
        password: "faux",
      });

    expect(response.status).toBe(200);
    expect(response.body.succes).toBe(false);
  });
});


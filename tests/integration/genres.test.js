const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

let server;

describe("api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const result = await request(server).get("/api/genres");
      expect(result.status).toBe(200);
      expect(result.body.length).toBe(2);
      expect(result.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(result.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if invalid id is passed", async () => {
      const result = await request(server).get("/api/genres/1");
      expect(result.status).toBe(404);
    });

    it("should return a genre if valid id is passed", async () => {
      const genre = await Genre({ name: "genre1" });
      await genre.save();

      const result = await request(server).get("/api/genres/" + genre._id);

      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("name", genre.name);
    });
  });

  describe("POST /", () => {
    // Define the happy path, and then  in each test,
    // we changr one parammeter that clearly aligns with the name of the test.

    let token, name;

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });
    
    it("should return 401 if client is not logged in", async () => {
      token = "";

      const result = await exec();

      expect(result.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      name = "1234";

      const result = await exec();

      expect(result.status).toBe(400);
    });

    it("should return 400 if genre is more than 50 characters", async () => {
      name = new Array(52).join("a");

      const result = await exec();

      expect(result.status).toBe(400);
    });

    it("should save genre if it is valid", async () => {
      await exec();

      const genre = await Genre.find({ name: "genre2" });
      expect(genre).not.toBeNull();
    });

    it("should return genre if it is valid", async () => {
      const result = await exec();

      expect(result.body).toHaveProperty("_id");
      expect(result.body).toHaveProperty("name", "genre1");
    });
  });
});

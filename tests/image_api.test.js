const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("Image Compression Endpoint", () => {
  test("Should compress the sent image and return a download link", async () => {
    const serverResponse = await api
      .post("/imageapi")
      .set("Content-Type", "multipart/form-data")
      .attach("image", `${__dirname}/dummies/dummy_img.png`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const downloadLink = serverResponse.body.link;
    expect(downloadLink).toBeDefined();
    console.log("download link is:", downloadLink);
  });

  test("Should throw an error on illegal non-image formatted files", async () => {
    await api
      .post("/imageapi")
      .set("Content-Type", "multipart/form-data")
      .attach("image", `${__dirname}/dummies/dummy.json`)
      .expect(401)
  });

  test("Should return 401 for unauthorized access", async () => {
    await api.post("/someapi").expect(401);
  });
});

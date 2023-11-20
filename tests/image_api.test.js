const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("Image Compression Endpoint", () => {
  test("Should compress the sent image and return a download link", async () => {
    const serverResponse = await api
      .post("/imageapi")
      .set("Content-Type", "multipart/form-data")
      .attach("image", `${__dirname}/dummy_img.png`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const downloadLink = serverResponse.body.link;
    expect(downloadLink).toBeDefined();
    console.log("download link is:", downloadLink);
  });

  test("Should return 401 for unauthorized access", async () => {
    const serverResponse = await api.post("/someapi").expect(401);
  });
});

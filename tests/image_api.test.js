const supertest = require("supertest");
const app = require("../app");
const fs = require('fs');
const api = supertest(app);

describe("Image Compression Endpoint", () => {
  test.skip("Should compress the sent image and return a download link", async () => {
    const serverResponse = await api
      .post("/imageapi")
      .set("Content-Type", "multipart/form-data")
      .attach("image", `${__dirname}/dummies/dummy_img.png`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const downloadContent = serverResponse.body;
    const downloadLink = serverResponse.body.imageUrl;
    expect(downloadLink).toBeDefined();
  });

  test.skip("Should throw an error on illegal non-image formatted files", async () => {
    await api
      .post("/imageapi")
      .set("Content-Type", "multipart/form-data")
      .attach("image", `${__dirname}/dummies/dummy.json`)
      .expect(401);
  });

  test.skip("Should return 401 for unauthorized access", async () => {
    await api.post("/someapi").expect(401);
  });

  it("Should compress the image based on request parameters", async () => {
    const payload = {
      quality: "80",
      format: "jpeg",
      width: "100",
      height: "100",
    };

    const response = await api
      .post("/imageapi")
      .field("quality", payload.quality)
      .field("format", payload.format)
      .field("width", payload.width)
      .field("height", payload.height)
      .attach("image", `${__dirname}/dummies/dummy_img.png`)
      .expect(200);

    expect(response.headers["content-type"]).toEqual(
      "image/jpeg; charset=utf-8"
    );
    expect(response.body).toBeDefined();
  });

  it("Should compress the image with auto-scale if given height/width is zero", async () => {
    const payload = {
      quality: "80",
      format: "jpeg",
      width: "0",
      height: "0",
    };

    const response = await api
      .post("/imageapi")
      .field("quality", payload.quality)
      .field("format", payload.format)
      .field("width", payload.width)
      .field("height", payload.height)
      .attach("image", `${__dirname}/dummies/dummy_img.png`)
      .expect(200);

    expect(response.headers["content-type"]).toEqual(
      "image/jpeg; charset=utf-8"
    );
    expect(response.body).toBeDefined();
  });
  it("Should throw error if given width/height is below zero", async () => {
    const payload = {
      quality: "80",
      format: "jpeg",
      width: "-50",
      height: "0",
    };

    await api
      .post("/imageapi")
      .field("quality", payload.quality)
      .field("format", payload.format)
      .field("width", payload.width)
      .field("height", payload.height)
      .attach("image", `${__dirname}/dummies/dummy_img.png`)
      .expect(500);
  });
  it("Should throw unauthorized error if given file format is anything but image/*", async () => {
    const payload = {
      quality: "80",
      format: "jpeg",
      width: "100",
      height: "100",
    };

    await api
      .post("/imageapi")
      .field("quality", payload.quality)
      .field("format", payload.format)
      .field("width", payload.width)
      .field("height", payload.height)
      .set("Content-Type", "multipart/form-data")
      .attach("image", `${__dirname}/dummies/dummy.js`)
      .expect(401);
  });
  it("Should the processed image be smaller than the original", async () => {
    const testImagePath = `${__dirname}/dummies/dummy_img.png`; 

    const response = await api
      .post("/imageapi")
      .field("quality", "10")
      .field("format", "jpeg")
      .field("width", "800") 
      .field("height", "600") 
      .attach("image", testImagePath)

    expect(response.status).toBe(200);

    const originalImageSize = fs.statSync(testImagePath).size;
    const compressedImageSize = Buffer.byteLength(response.body); 

    expect(compressedImageSize).toBeLessThan(originalImageSize);
  });
});

describe('Rate limiting', () => {
  it.skip('Rate limiter should restrict number of requests', async () => {

    const testImagePath = `${__dirname}/dummies/dummy_img.png`; 

    const response0 = await api
      .post("/imageapi")
      .field("quality", "10")
      .field("format", "jpeg")
      .field("width", "800") 
      .field("height", "600") 
      .attach("image", testImagePath)

      const response1 = await api
      .post("/imageapi")
      .field("quality", "10")
      .field("format", "jpeg")
      .field("width", "800") 
      .field("height", "600") 
      .attach("image", testImagePath)

      const response2 = await api
      .post("/imageapi")
      .field("quality", "10")
      .field("format", "jpeg")
      .field("width", "800") 
      .field("height", "600") 
      .attach("image", testImagePath)

      const response3 = await api
      .post("/imageapi")
      .field("quality", "10")
      .field("format", "jpeg")
      .field("width", "800") 
      .field("height", "600") 
      .attach("image", testImagePath)


    // Expect the third request to be rate limited
    expect(response0.status).toBe(200);
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response3.status).toBe(429);
    expect(response3.body.message).toBe('Too many requests from this IP, please try again later.');
  });
});
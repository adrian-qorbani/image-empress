const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("Image Compression Endpoint", () => {
  test.skip("Should compress the sent image and return a download link", async () => {
    const serverResponse = await api
      .post("/imageapi")
      .set("Content-Type", "multipart/form-data")
      .attach("image", `${__dirname}/dummies/dummy_img.png`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const downloadContent = serverResponse.body
    const downloadLink = serverResponse.body.imageUrl;
    expect(downloadLink).toBeDefined();
  });

  test.skip("Should throw an error on illegal non-image formatted files", async () => {
    await api
      .post("/imageapi")
      .set("Content-Type", "multipart/form-data")
      .attach("image", `${__dirname}/dummies/dummy.json`)
      .expect(401)
  });

  test.skip("Should return 401 for unauthorized access", async () => {
    await api.post("/someapi").expect(401);
  });

  it('Should compress the image based on request parameters', async () => {
    // Mock request payload
    const payload = {
      quality: '80',
      format: 'jpeg',
      width: '300',
      height: '200'
      // ... Add other required payload fields including the image file
    };

    // Send a POST request using supertest
    const response = await api
      .post('/imageapi')
      .field('quality', payload.quality)
      .field('format', payload.format)
      .field('width', payload.width)
      .field('height', payload.height)
      // Attach the image file, assuming it's located at "path/to/your/image.jpg"
      .attach("image", `${__dirname}/dummies/dummy_img.png`)
      .expect(200);

    // Verify the response
    expect(response.headers['content-type']).toEqual('image/jpeg; charset=utf-8');
    expect(response.body).toBeDefined();  // Assuming the response body is the compressed image
  });
});

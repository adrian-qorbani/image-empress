import { Helmet } from "react-helmet-async";

const MyHelmet = () => {
  return (
    <div>
      <Helmet prioritizeSeoTags>
        <title>
          Image Empress | Reduce size, compress or resize images online FREE and
          FAST
        </title>
        <meta
          name="description"
          content="Compress, reduce size, and optimize images with any formats in seconds."
        />
        <meta
          name="keywords"
          content="image compression, image optimization, resize images, reduce file size, image processing, reduce image size, convert image format, convert image type"
        />
        <meta
          property="og:title"
          content="Image Compression and Optimization"
        />
        <meta
          property="og:description"
          content="Compress, reduce size, and optimize images for your website with our image processing tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www..com" />
        <meta property="og:image" content="https://www..com/og-image.jpg" />
      </Helmet>
    </div>
  );
};

export default MyHelmet;

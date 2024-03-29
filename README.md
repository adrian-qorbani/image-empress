# Image-Empress

This fullstack web application is designed to compress, optimize, resize and convert format for images up to 50 megabyte size and compress them via express.js server (with Sharp lib). It's created using express.js (node) for server-side and React for client. Output image is fully customizable, with user choosing its format, compression quality and width/height.

See Live: [Live View](https://imageempress.onrender.com).

NOTE: As of March 1st 2024, my [Render Cloud Service](http://render.com) free tier account doesn't support disk usage, so uploading images doesn't work. In order to use it yourself, run the project on your machine.

![my screenshot](./screenshot.png)

## Features

- Image compression (depending on given output quality)
- Format conversion (e.g., JPG to PNG)
- Resizing images based on specified width and height
- Localization using i18next with language detector
- Responsive UI using Pico.css light stylesheet
- Security with Helmet.js and express-rate-limit
- Jest testing for server
- Custom logging for server activity


## Tech Stack

- Language: JavaScript
- Client: React, bundled with Vite 
- Server-side: Express.js (node.js)

## Installation

To run this project locally, follow these steps:

1. Clone the repository.

git clone https://github.com/adrian-qorbani/image-empress.git

2. Change into the project's directory.


cd pic_slimmer_backend

3. Install dependencies for the backend and frontend.

# Install server dependencies
npm install

# Install client dependencies
cd frontend/
npm install

## To-Do List

- Adding integrated tests for frontend
- Adding end-to-end test for both client and server
- Changing repo name to Image-Empress





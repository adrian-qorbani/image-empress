# Image-Empress

This fullstack web application is designed to compress, optimize, resize and convert format for images up to 50 megabyte size and compress them via express.js server (with Sharp lib). It's created using express.js (node) for server-side and React for client.


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

git clone https://github.com/adrian-qorbani/pic_slimmer_backend.git

2. Change into the project's directory.


cd pic_slimmer_backend

3. Install dependencies for the backend and frontend.

# Install server dependencies
npm install

# Install client dependencies
cd frontend/
npm install





# To-Do List - Backend

- [x] APIs implanted
- [x] fix image size comparison
- [x] implant advanced output options for backend such as width and quality parameters
- [x] write backend tests for advanced settings
- [ ] write E2E tests for application

# To-Do List - Frontend

- [x] fix multiple image upload
- [x] upload sanitization and validation
- [x] implant Redux
- [x] write backend tests for advanced settings
- [ ] fix responsive screens bugs
- [ ] write extensive tests
- [ ] make a better website layout
- [ ] SEO/Accessability optimization
- [ ] Policy writing
- [ ] add react-routing
- [ ] write extensive tests
- [ ] implant French, German, Spanish and Russian locales
- [ ] write extensive tests

# To-Do List - UI/UX
- [ ] make a worthy logo





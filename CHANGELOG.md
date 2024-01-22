# Changelog

All notable changes to ImageEmpress will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.1 - BETA] - 2023-11-29

- Added `fundamental base server` written with powerful express.js along with other libraries. This marks the official beginning of ImageEmpress web application. 

- Added `frontend react` from its separate directory into backend for the application to become `monolithic`.

- Added `changelog` to project.

## [0.9.2 - BETA] - 2024-01-21

- Updated `readme.md`.
- Changed `express-rate-limit` to a higher amount. It's not neccesery when using a cloud provider like Render, it comes with a rate limiter itself. You can disable it if you want, its located in `./utils/middlewares.js`.
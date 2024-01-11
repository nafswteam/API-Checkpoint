# REST API Checkpoint

This project is a simple REST API with CRUD operations for managing user data.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The project consists of two main files:

- `server.js`: Contains the Express server setup, API routes, and database connection logic.
- `model/User.js`: Defines the Mongoose schema and model for the User entity.
- `package.json`: Configuration file for Node.js with project dependencies and scripts.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arigbedeomobolaji/REST-API-Checkpoint.git

2. Navigate to the project directory:

   ```bash
   cd rest_api_checkpoint

3. Install dependencies:

   ```bash
   npm install

## Usage

1. To run the project in development mode::

   ```bash
   npm run dev

2. To start the project in production mode:

   ```bash
   npm start

## API Endpoints

1. Seed Database with Users:

   ```http
   GET /seed
This endpoint creates bulk users in the database using pre-generated data.
  

2. Get All Users

   ```http
   GET /
Returns a list of all users in the database.
  

3. Add a New User

   ```http
   POST /
Adds a new user to the database. Requires a JSON payload in the request body.


4. Edit a User by ID

   ```http
   PUT /:id
Edits a user with the specified ID. Requires a JSON payload in the request body.



5. Remove a User by ID

   ```http
   DELETE /:id
Removes a user with the specified ID.


## Environment Variables

1. Make sure to create a .env file in the config directory with the following variables:

   ```env
   DB_URL=your_database_url
   PORT=your_server_port


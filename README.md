Campus Lost & Found API

This project is a robust RESTful API for a campus-wide lost and found service, built as part of the Developers' Society Sophomore Selections. It provides endpoints for creating, retrieving, and managing lost and found items, with a secure, token-based authentication system for administrative actions.
Tech Stack

    Backend: Node.js, Express.js

    Database: MongoDB (with Mongoose)

    Authentication: JSON Web Tokens (JWT)

    Password Hashing: bcryptjs

Getting Started
Prerequisites

    Node.js (v18 or higher)

    MongoDB Atlas account (or a local MongoDB instance)

    An API testing tool like Postman

Installation & Setup

    Clone the repository:

    git clone [https://github.com/hsr108/lost-and-found-api.git](https://github.com/hsr108/lost-and-found-api.git)
    cd lost-and-found-api

    Install dependencies:

    npm install

    Create a .env file in the root directory and add the following environment variables:

    PORT=5000
    MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
    JWT_SECRET=YOUR_SUPER_SECRET_RANDOM_STRING

    Seed the database with an admin user:
    Run the seeder script once to create the default admin user (username: admin, password: password123).

    node utils/seeder.js

    Start the server:

    node server.js

    The API should now be running on http://localhost:5000.

API Endpoints
Authentication

    POST /api/auth/login

        Logs in an administrator.

        Body: { "username": "admin", "password": "password123" }

        Response: { "success": true, "token": "YOUR_JWT_TOKEN" }

Items

    GET /api/items

        Retrieves a list of all items. Publicly accessible.

        Query Parameters (Optional):

            ?status=Found or ?status=Lost

            ?category=Electronics

    POST /api/items

        Creates a new item. Requires authentication.

        Headers: Authorization: Bearer YOUR_JWT_TOKEN

        Body:

        {
          "title": "Item Title",
          "description": "Item Description",
          "category": "Item Category",
          "status": "Found",
          "location": "Location Found/Lost"
        }

    PUT /api/items/:id

        Updates an existing item. Requires authentication.

        Headers: Authorization: Bearer YOUR_JWT_TOKEN

        Body: (Include any fields you want to update)

        {
          "isClaimed": true
        }

    DELETE /api/items/:id

        Deletes an item. Requires authentication.

        Headers: Authorization: Bearer YOUR_JWT_TOKEN

Challenges & Decisions

During development, a key decision was choosing MongoDB for its schema flexibility, which is ideal for an application where item descriptions and categories can vary. A challenge was ensuring the authentication middleware was both secure and robust, which was solved by adding explicit runtime checks for the JWT payload to guard against malformed tokens.
Event API
This is an Event API built with Django and Django REST Framework (DRF) that uses JWT for authentication. It allows users to manage events, including creating, viewing, updating.

Features
JWT Authentication.
CRUD operations for events.
Swagger Documentation: Auto-generated API docs with Swagger UI.

Technologies
Django 5.1.5
Django REST Framework
SimpleJWT
DRF Spectacular - OpenAPI 3
PostgreSQL
Docker for containerization
The frontend was made with React.

Installation
1. Clone the repository
git clone <repo_link>
cd <project_directory>
2. Build and Run with Docker
docker compose build
docker compose up
This will set up the project and run the server. The API will be available at http://localhost:5173/.

Authentication
To log in and obtain a JWT token, send a POST request to api/events/login/:

Request:

{
  "email": "user@example.com",
  "password": "your_password"
}
Response:
{
  "access": "your_jwt_access_token",
  "refresh": "your_jwt_refresh_token"
}
Use the access token to authenticate:
Authorization: Bearer <your_access_token>

API Endpoints
0. Register (POST api/events/register/)

1. Login (POST api/events/login/)
Logs in a user and returns JWT tokens.

2. Get Events (GET api/events/)
Retrieves a list of future events.

3. Create Event (POST api/events/create/)
Creates a new event. Authentication required.

4. Update Event (PATCH api/events/<int:pk>/update/)
Updates an existing event. Authentication required.

5. Join Event (POST api/events/<int:pk>/join/)
Join an existing event. Authentication required.

Swagger Documentation
You can view the auto-generated API documentation at:

http://localhost:8000/docs/

The db migrations are run when the app is first started, but there are no fixtures for adding users yet.
Use the registration feature to create users.

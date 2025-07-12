# Express EJS Micropost App

A simple micropost application built with Express.js, EJS templating, and JSON database storage. Features both web interface and REST API.

## Features

- **CRUD Operations**: Create, read, update, and delete microposts
- **Web Interface**: EJS-based responsive web interface with modern design
- **REST API**: JSON API endpoints for programmatic access
- **OpenAPI Documentation**: Swagger UI for API documentation
- **Modern Design**: Based on Mosaic admin template with dark mode support

## Tech Stack

- **Backend**: Express.js 5
- **View Engine**: EJS with express-ejs-layouts
- **Database**: JSON file storage with lowdb
- **Styling**: Custom CSS inspired by Tailwind/Mosaic design
- **API Documentation**: OpenAPI 3.0 with Swagger UI

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser:
- Web interface: http://localhost:3000
- API documentation: http://localhost:3000/api/docs

## API Endpoints

### Base URL: `/api`

- `GET /microposts` - Get all microposts
- `POST /microposts` - Create a new micropost
- `GET /microposts/:id` - Get a specific micropost
- `PUT /microposts/:id` - Update a micropost
- `DELETE /microposts/:id` - Delete a micropost

### Example API Usage

```bash
# Get all microposts
curl http://localhost:3000/api/microposts

# Create a new micropost
curl -X POST http://localhost:3000/api/microposts \
  -H "Content-Type: application/json" \
  -d '{"title": "My new micropost"}'

# Get a specific micropost
curl http://localhost:3000/api/microposts/1

# Update a micropost
curl -X PUT http://localhost:3000/api/microposts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated title"}'

# Delete a micropost
curl -X DELETE http://localhost:3000/api/microposts/1
```

## Web Interface

The web interface provides a user-friendly way to manage microposts:

- **Home Page** (`/`): List all microposts with grid layout
- **New Post** (`/microposts/new`): Create a new micropost
- **View Post** (`/microposts/:id`): View individual micropost
- **Edit Post** (`/microposts/:id/edit`): Edit existing micropost

## Database

The application uses a JSON file (`data/db.json`) for data storage. The micropost model includes:

```json
{
  "id": 1,
  "title": "Sample micropost",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Project Structure

```
├── src/
│   ├── controllers/         # API controllers
│   ├── viewControllers/     # Web page controllers
│   ├── routes/
│   │   ├── api/            # API routes
│   │   └── web/            # Web routes
│   ├── models/             # Data models
│   ├── middlewares/        # Express middlewares
│   ├── views/              # EJS templates
│   │   ├── layouts/        # Layout templates
│   │   └── pages/          # Page templates
│   └── server.js           # Main server file
├── public/                 # Static assets (CSS, JS, images)
├── data/                   # Database files
└── openapi.yaml            # API documentation
```

## Development

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## API Documentation

Visit `/api/docs` to view the interactive Swagger UI documentation with all available endpoints, request/response schemas, and examples.

## Design

The interface design is inspired by the Mosaic admin template, featuring:
- Clean, modern layout
- Dark mode support
- Responsive grid design
- Intuitive navigation
- Form validation
- Loading states and error handling
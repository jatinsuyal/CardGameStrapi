# Online Card Game Backend

This is the backend for the Online Card Game project, built using Node.js, Strapi, and PostgreSQL. The backend handles game logic, player authentication, and data management. It is designed to work seamlessly with the game's frontend.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [License](#license)

## Features

- User authentication and management
- Game session management
- RESTful API for the game frontend
- Admin panel for managing game data (powered by Strapi)
- Secure JWT-based authentication
- Integration with PostgreSQL database

## Technologies

- **Node.js**: Backend server runtime
- **Strapi**: Headless CMS for managing content and data
- **PostgreSQL**: Relational database management system
- **Docker**: Containerization of the application for consistent development and production environments

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js (>= 14.x)
- Docker and Docker Compose
- PostgreSQL (if not using Docker)
- Yarn (Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/online-card-game-backend.git
   cd online-card-game-backend
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=onlinecardgame
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_SSL=false
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
PUBLIC_URL=your_production_url
PROJECT_SLUG=onlinecardgame
```

Replace the placeholders with your actual configuration.

## Database Setup

If using Docker, the PostgreSQL database will be set up automatically. If running locally:

1. Ensure PostgreSQL is installed and running.
2. Create a new database with the name specified in your `.env` file.

   ```bash
   createdb onlinecardgame
   ```

## Running the Project

### Development

To run the project in development mode:

```bash
cd backend
yarn develop
```

This will start the Strapi server and provide access to the admin panel.

### Production

To build and run the project in production:

```bash
cd backend
yarn build
yarn start
```

## Deployment

### Deploying to Render

1. Push your code to GitHub.
2. Connect your GitHub repository to Render.
3. Set environment variables in the Render dashboard.
4. Use the following build and start commands in Render:
   
   - **Build Command**: `yarn --frozen-lockfile install; yarn build`
   - **Start Command**: `yarn start`

### Deploying to Railway

1. Push your code to GitHub.
2. Connect your GitHub repository to Railway.
3. Set environment variables in the Railway dashboard.
4. Use the following build and start commands in Railway:
   
   - **Build Command**: `yarn --frozen-lockfile install; yarn build`
   - **Start Command**: `yarn start`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

You can copy this file directly to your GitHub repository.

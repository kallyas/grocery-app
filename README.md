# Grocery App API (TypeScript + ESM)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A modern TypeScript-based REST API for a grocery application with ESM support, featuring user authentication, JWT tokens, and MongoDB integration.

## 🚀 Features

- **TypeScript** with ES Modules for type safety and modern development
- **RESTful API** with Express.js framework
- **MongoDB** integration with Mongoose ODM
- **JWT Authentication** with secure password hashing
- **Input Validation** using Joi
- **CORS Support** for cross-origin requests
- **Environment-based Configuration** for different deployment stages
- **Production-ready** with proper error handling and security middleware

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Support](#-support)
- [License](#-license)

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your environment variables
4. Start development server: `npm run dev`
5. The API will be available at `http://localhost:5000`

## 📋 Installation

### Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/downloads)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kallyas/grocery-app.git
   cd grocery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your configuration values.

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `NODE_ENV` | Server environment | `development`, `production`, `local` |
| `DB_URL` | Default database URL | `mongodb://localhost:27017/grocery-app` |
| `DB_URL_DEV` | Development database URL | `mongodb://localhost:27017/grocery-app-dev` |
| `DB_URL_PROD` | Production database URL | `mongodb://localhost:27017/grocery-app-prod` |
| `DB_URL_LOC` | Local database URL | `mongodb://localhost:27017/grocery-app-local` |
| `SECRET` | Secret key for token verification | `your-secret-key-here` |
| `ACCESS_TOKEN_SECRET` | JWT access token secret | `your-access-token-secret-here` |

> ⚠️ **Security Note**: Use strong, randomly generated secrets in production environments.

## 🛠️ Usage

### Development Mode
Run the application with TypeScript directly using ts-node:
```bash
npm run dev
```

### Development with Watch Mode
Automatically restart on file changes:
```bash
npm run dev:watch
```

### Production Build
Build the TypeScript code to JavaScript:
```bash
npm run build
```

### Production Mode
Start the compiled JavaScript application:
```bash
npm start
```

### Other Commands
- **Type checking**: `npm run type-check`
- **Clean build directory**: `npm run clean`
- **Clean build**: `npm run build:clean`

## 📁 Project Structure

```
grocery-app/
├── src/
│   ├── types/                  # TypeScript type definitions
│   │   ├── user.types.ts      # User-related types
│   │   ├── env.types.ts       # Environment types
│   │   └── express.types.ts   # Express-related types
│   ├── server/
│   │   ├── Controllers/       # API controllers
│   │   ├── Models/           # Database models
│   │   ├── Routes/           # API routes
│   │   ├── config/           # Configuration files
│   │   ├── helpers/          # Helper functions
│   │   ├── middlewares.ts    # Express middlewares
│   │   └── app.ts           # Express app setup
│   └── index.ts             # Application entry point
├── dist/                     # Compiled JavaScript (generated)
├── .env.example             # Environment variables template
├── package.json             # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 📚 API Documentation

The API provides endpoints for user authentication and management. All endpoints return JSON responses.

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
Protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

### Create User Account

Create a new user account in the application.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "username": "testuser",
  "email": "testemail@exampleuser.com",
  "password": "password"
}
```

**Success Response:**
- **Status:** `200 OK`
- **Content:**
```json
{
  "Message": "User account succesfully created!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- **422 Unprocessable Entity:**
```json
{
  "status": 422,
  "message": "an error occured"
}
```

- **Validation Errors:**
```json
{
  "message": "\"username\" is required"
}
```

---

### User Login

Authenticate a user and receive an access token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password"
}
```

**Success Response:**
- **Status:** `200 OK`
- **Content:**
```json
{
  "message": "logged In",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- **Validation Errors:**
```json
{
  "message": "\"username\" is required"
}
```

---

### Get User by ID

Retrieve user information by their ID (requires authentication).

**Endpoint:** `GET /user/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response:**
- **Status:** `200 OK`
- **Content:** User object with user details

## 🤝 Contributing

We welcome contributions to the Grocery App API! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and ensure they follow the project's coding standards
4. Add or update tests as necessary
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use ESM module syntax
- Maintain consistent code formatting
- Write clear, descriptive commit messages
- Update documentation when necessary

### Code Style
- Use TypeScript for all new code
- Follow the existing code structure and patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

## 🧪 Testing

Currently, the project uses a placeholder test script. To run tests:

```bash
npm test
```

> **Note:** Test implementation is a work in progress. Contributions for comprehensive testing are welcome!

## 🚀 Deployment

### Production Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set environment variables:**
   - Configure production database URL
   - Set strong JWT secrets
   - Set NODE_ENV to 'production'

3. **Start the application:**
   ```bash
   npm start
   ```

### Using Process Managers

For production deployments, consider using process managers like PM2:

```bash
npm install -g pm2
pm2 start dist/index.js --name grocery-app
```

### Docker Deployment

The project includes configurations for containerized deployment. Check the `.gitpod.Dockerfile` for reference.

## 🆘 Support

### Getting Help

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/kallyas/grocery-app/issues)
- **Discussions**: Join the conversation in GitHub Discussions
- **Documentation**: Check this README and inline code documentation

### Common Issues

1. **MongoDB Connection Issues**: Ensure MongoDB is running and the connection string is correct
2. **Environment Variables**: Verify all required environment variables are set
3. **Port Conflicts**: Check if the specified port is already in use

### Security

If you discover a security vulnerability, please send an email to the maintainer instead of opening a public issue.

## 👥 Contributors

- [Kallyas](https://github.com/kallyas) - Project Creator & Maintainer

Want to contribute? See the [Contributing](#-contributing) section above!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ for the grocery management community</p>
  <p>
    <a href="https://kallyas.github.io/grocery-app/">🌐 Live Demo</a> •
    <a href="https://github.com/kallyas/grocery-app/issues">🐛 Report Bug</a> •
    <a href="https://github.com/kallyas/grocery-app/issues">✨ Request Feature</a>
  </p>
</div>

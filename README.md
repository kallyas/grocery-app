# Grocery App API (TypeScript + ESM)

# Table Of Contents

1. [Project Overview](#project-overview)
2. [Usage](#usage)
   1. [Pre-requisites](#pre-requisites)
   2. [Development Setup](#development-setup)
   3. [Building and Running](#building-and-running)
3. [API Documentation](#api-documentation)
4. [Contributors](#contributors)

<br>

# **Project Overview**

Grocery-API is a modern TypeScript-based REST API for a grocery application. The project has been converted from JavaScript to TypeScript with ESM (ECMAScript Modules) support for improved type safety, code maintainability, and modern development practices.

## **Technology Stack**

- **TypeScript** - For type safety and better development experience
- **Node.js** with **ESM** - Modern JavaScript module system
- **Express.js** - Web framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Input validation

# Environment Variables

- **PORT** -- `server port number`
- **DB_URL** -- `database URL`
- **DB_URL_DEV** -- `development database URL`
- **DB_URL_PROD** -- `production database URL`
- **DB_URL_LOC** -- `local database URL`
- **SECRET** -- `Secret key for verifying the token`
- **ACCESS_TOKEN_SECRET** -- `Secret key for JWT access tokens`
- **NODE_ENV** -- `Specifies the Server environment (development, local, production)`

# **Usage**

## **Pre-requisites**

- [Node.js](https://nodejs.org/en/download/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [TypeScript](https://www.typescriptlang.org/) (installed as dev dependency)

## **Development Setup**

1. **Clone** this repository:
   ```bash
   git clone https://github.com/kallyas/grocery-app.git
   cd grocery-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the required environment variables listed above.

## **Building and Running**

### **Development Mode**
Run with TypeScript directly using ts-node:
```bash
npm run dev
```

### **Production Build**
Build the TypeScript code to JavaScript:
```bash
npm run build
```

### **Production Mode**
Start the compiled JavaScript application:
```bash
npm start
```

## **Project Structure**

```
src/
├── types/                  # TypeScript type definitions
│   ├── user.types.ts      # User-related types
│   ├── env.types.ts       # Environment types
│   └── express.types.ts   # Express-related types
├── server/
│   ├── Controllers/       # API controllers
│   ├── Models/           # Database models
│   ├── Routes/           # API routes
│   ├── config/           # Configuration files
│   ├── helpers/          # Helper functions
│   ├── middlewares.ts    # Express middlewares
│   └── app.ts           # Express app setup
└── index.ts             # Application entry point
```

# **API Documentation**

# Create a User

Adds in a new single user into the Application.

| End Point             | Method | Params | Data Type |
| --------------------- | ------ | ------ | --------- |
| `/api/v1/auth/signup` | POST   | `none` | `none`    |

- **Request Body**

```json
{
  "username": "testuser",
  "email": "testemail@exampleuser.com",
  "password": "password"
}
```

- **Request Headers**

> None

- **Success Response:**

**Status: `200 OK`**

- **Sample Content:**

```json
{
  "Message": "User account succesfully created!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  eyJpZCI6IjVmNTc2OTlmM2U4NjFjMDAxNzBhNTFhMSIsImlhdCI6MTU5OTU2NDE5MSwiZXhwIjoxNTk5NjUwNTkxfQ.
  Hkp5ruXBMYdJ4pYdQCIJbKfB5PU6hdss5lEXehtNGUc"
}
```

- **Error Response**

```json
{
  "status": 422,
  "message": "an error occured"
}
```

- **Validation Error Response for Email Missing field**

```json
{
  "message": "\"username\" is required"
}
```

- **validation Error Response for Password Missing field**

```json
{
  "message": "\"email\" is required"
}
```

# **Login User**

Logs in a single user into the Application


| End Point             | Method | Params | Data Type |
| --------------------- | ------ | ------ | --------- |
| `/api/v1/auth/login`  | POST   | `none` | `none`    |


- **Request Body**

```json
{
  "username": "testuser",
  "password": "password"
}
```

- **Response Body**

```json
{
  "message": "logged In",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJ1c2VybmFtZSI6ImthbGx5IiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYwMDc4Mjc3MywiZXhwIjoxNjAwODY5MTczfQ
  .TfG4lq7AZtWU6ES332_boK6eGdiexPH7eb3IxhXVL2k"
}
```

**Validation Errors**

```json
{
  "message": "\"username\" is required"
}
```

```json
{
  "message": "\"password\" is required"
}
```

## Get User By ID

Returns a single user by their Id

| End Point             | Method | Params | Data Type |
| --------------------- | ------ | ------ | --------- |
| `/api/v1/user/:id`    | GET    | `none` | `none`    |

- **Request Headers**

`{ Authorisation: Bearer Token}`

- **Response Body**

Returns user object

# **Contributors**

1. [Kallyas](https://github.com/kallyas)

# License

[MIT](/LICENSE)

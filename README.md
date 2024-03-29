# Grocery App API

# Table Of Contents

1. [Project Overview](#project-overview)
2. [Usage](#usage)
   1. [Pre-requisites](#pre-requisites)
3. [Contributors](#contributors)

<br>

# **Project Overview**

Grocery-API is an API(Back End for grocery Application).

# Environment Variables

- **PORT** -- `server port number`

- **DB_URL** -- `database URL`

- **SECRET** -- `Secret key for verifying the token`

- **NODE_ENV** -- `Specifies the Server environment (development, local, production)`

# **Usage**

- `clone` this repository.

- `cd` into project root directory.

- run `npm install` to install all dependencies. (you must have [pre-requisites](#pre-requisites))

- Run `npm start` to start the server.

- Open up `Postman` and then test out the Endpoints.

# **Pre-requisites**

- [Node Js](https://nodejs.org/en/download/)
- [Mongo DB](https://www.mongodb.com/try/download/community)

# **User CRUD Operations**

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

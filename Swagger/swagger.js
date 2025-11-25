// package.json must include: "type": "module"

import generateSwagger from 'swagger-autogen';

const options = {
    openapi: "3.0.0",
    language: "en-US",
    disableLogs: false,
    autoHeaders: false,
    autoQuery: false,
    autoBody: false,
};

const swaggerDocument = {
    // openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "Chart-app API",
        description: `
API for Mapats testing suite.

**Usage Instructions:**

1. First, use the **Login** endpoint (\`POST /api/auth/login\`) by providing your email and password.
2. The login response will return a JWT token.
3. Copy the token value (without quotes).
4. For all subsequent API calls requiring authorization, add this token in the **Authorization** header as:

\`Bearer <token>\`

Make sure to replace \`<token>\` with the actual token string returned by login.

Example Header:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

`,
        contact: {
            name: "API Support",
            email: "chandrasekaran2996@gmail.com",
        },
    },
    host: "localhost:8080",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    definitions: {
       
    },
};

const swaggerFile = "./swagger/swagger.json";
const apiRouteFile = ["../index.js"];


// Generate swagger JSON
generateSwagger(swaggerFile, apiRouteFile, swaggerDocument, options);
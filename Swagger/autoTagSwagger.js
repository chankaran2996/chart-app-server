import fs from 'fs';

const swaggerPath = './swagger/swagger.json';
const swagger = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

// Apply Authorization globally
swagger.security = [
  {
    BearerAuth: []
  }
];

const humanizeTag = (tag) => {
  return tag ? tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') : "";
}

const tagSet = new Set();

for (const path in swagger.paths) {
  const tag = path.split('/')[3]; // e.g., "auth" from "/api/auth/login"
  tagSet.add(tag);

  const methods = swagger.paths[path];
  for (const method in methods) {
    if (!methods[method].tags) {
      methods[method].tags = [humanizeTag(tag)];
    }
  }
 
}

swagger.tags = Array.from(tagSet).map(tag => ({
  name: humanizeTag(tag),
  description: `${humanizeTag(tag)} endpoints`
}));

 // ----------------------------
// 🔥 ADD AUTHORIZATION BLOCK
// ----------------------------

// Ensure components exists
swagger.components = swagger.components || {};

swagger.components.securitySchemes = {
  BearerAuth: {
    type: "http",
    scheme: "Bearer ",
    bearerFormat: "JWT",
  }
};

fs.writeFileSync(swaggerPath, JSON.stringify(swagger, null, 2));

console.log('Swagger JSON tagged with human-readable group names.');
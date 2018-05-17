module.exports = {
  port: process.env.PORT || 5000,
  db: process.env.MONGODB_URI || "mongodb://localhost/ecoactua",
  SECRET_TOKEN: process.env.JWT_TOKEN || "mypasstoken"
};

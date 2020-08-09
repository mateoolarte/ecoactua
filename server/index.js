if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("./app");
const config = require("./config");

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await config.db.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`);
  });
}

init();

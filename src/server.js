require("dotenv").config();
const PORT = process.env.PORT || 3000;
const sequelize = require("./api/database/db");
const app = require("./api/app");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

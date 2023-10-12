import "dotenv/config";
const PORT = process.env.PORT || 3000;
import app from "./api/app";
import client from "./api/database/pg";

app.listen(PORT, () => {
  if (client.connected) {
    console.log("Connected to database");
  }
  console.log(`Server listening on http://localhost:${PORT}`);
});

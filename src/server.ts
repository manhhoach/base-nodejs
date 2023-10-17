import "dotenv/config";
const PORT = process.env.PORT || 3000;
import app from "./api/app";
// import { connectDb } from "./api/database/pg";

app.listen(PORT, () => {
 // connectDb();
  console.log(`Server listening on http://localhost:${PORT}`);
});

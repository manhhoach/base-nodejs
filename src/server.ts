import "dotenv/config";
const PORT = process.env.PORT || 3000;

import app from "./api/app";

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

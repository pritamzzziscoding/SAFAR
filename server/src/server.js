import app from "./app.js";
import { db } from "./config/database.js";

const PORT = process.env.PORT || 8080;

db.getConnection()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed!", err);
  });

import { env, connectDB } from "./config";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
// Connect to the database
connectDB();

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import app from "./src/app.js";
import "dotenv/config";
import { dbConnect } from "./src/lib/db/index.js";
const port = process.env.PORT;
dbConnect();
const server = app.listen(port, () => {
  console.log("Server is listen on port", port);
});
server.on("close", () => {
  console.log("server has closed");
});

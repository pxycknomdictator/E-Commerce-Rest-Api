import { app, Request, Response } from "./app.js";
import { config } from "./config/configuration.js";
import { createServer } from "http";
import { databaseConnection } from "./config/db.js";

const PORT = config.port ?? 9000;
const server = createServer(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is Running... 💙" });
});

async function startServer() {
  try {
    await databaseConnection();
    console.log("✅ Database connected successfully!");

    server.listen(PORT, () => {
      console.log(`🚀 Server is running at: http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start Server");
  }
}

startServer();

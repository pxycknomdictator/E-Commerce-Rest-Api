import { app, NextFunction, Response, Request } from "./app.js";
import { config } from "./config/configuration.js";
import { createServer } from "http";
import { databaseConnection } from "./config/db.js";

const PORT = config.port ?? 9000;
const server = createServer(app);

app.get("/health", (req: Request, res: Response, next: NextFunction) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1 style="color: #007bff; font-size: 2.5rem;">🐳 Server is Running...</h1>
      <p style="color: #555; font-size: 1.2rem;">
        Everything is working perfectly. Enjoy coding! 🚀
      </p>
    </div>
  `);
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

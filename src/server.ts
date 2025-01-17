import { app, Request, Response } from "./app.js";
import { config } from "./config/configuration.js";
import { createServer } from "http";

const PORT = config.port ?? 9000;
const server = createServer(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is Running... 💙" });
});

server.listen(PORT, () =>
  console.log(`Server is listening at 🗲 : http://127.0.0.1:${PORT}`)
);

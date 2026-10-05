import "dotenv/config";
import express from "express";
import { startDB } from "./src/config/database.js";
import "./src/models/index.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./src/routes/auth.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { articleRouter } from "./src/routes/article.routes.js";
import { tagRouter } from "./src/routes/tag.routes.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

cors({
  origin: "http://localhost:5173",
  credentials: true,
});

app.use(express.json());

app.use(cookieParser());

//configuracion de rutas
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", articleRouter);
app.use("/api", tagRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});

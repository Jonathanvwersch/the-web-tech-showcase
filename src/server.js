import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pureSsrRouter from "./pure-ssr/router.js";
import mpaRouter from "./mpa/router.js";
import spaRouter from "./spa/router.js";
import ssrRouter from "./ssr/router.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname, "../landing")));

app.use("/pure-ssr", pureSsrRouter);
app.use("/mpa", mpaRouter);
app.use("/spa", spaRouter);
app.use("/ssr", ssrRouter);

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../landing/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

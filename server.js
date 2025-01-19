import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import ssrRouter from "./src/ssr/router.js";
import spaRouter from "./src/spa/router.js";
import mpaRouter from "./src/mpa/router.js";
import pureSSRRouter from "./src/pure-ssr/router.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Serve landing page
app.use(express.static(path.join(__dirname, "landing")));

// Mount routers
app.use("/ssr", ssrRouter);
app.use("/spa", spaRouter);
app.use("/mpa", mpaRouter);
app.use("/pure-ssr", pureSSRRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

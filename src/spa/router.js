import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.use(express.static(path.join(__dirname, "public")));

router.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default router;

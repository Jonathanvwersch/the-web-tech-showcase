import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.use(express.static(path.join(__dirname, "public")));
router.use(express.urlencoded({ extended: true }));

router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "pages", "home.html"));
});

router.get("/about", (_, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"));
});

router.get("/more", (_, res) => {
  res.sendFile(path.join(__dirname, "pages", "more.html"));
});

export default router;

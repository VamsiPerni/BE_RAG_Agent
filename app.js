const dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");
require("./config/db");

const { apiRouter } = require("./api/v1/routes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin:
      "https://wealth-query-ai-git-main-mohana-vamsi-pernis-projects.vercel.app/api/v1",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors());

app.use((req, res, next) => {
  console.log("-----");
  console.log(new Date(), req.method, req.url);
  console.log("-----");
  next();
});

app.use("/api/v1", apiRouter);

app.listen(8080, () => {
  console.log("----------Server is Running------");
});

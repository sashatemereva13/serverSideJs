import express from "express";
import cors from "cors";
import router from "./solution/routes/routes.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

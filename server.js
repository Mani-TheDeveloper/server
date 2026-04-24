const express = require("express");
const cors = require("cors")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.post("/webhook", async (req, res) => {
  console.log(req.body["Body"]);
  res.json({ status: "received", data: req.body["Body"] });
});

app.get("/", (req, res) => {
  console.log("📩 Incoming GET request");
  res.json({ status: "received" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
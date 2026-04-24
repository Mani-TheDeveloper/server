const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log(data);
  res.json({ status: "received", data: data });
});

app.get("/", (req, res) => {
  console.log("📩 Incoming GET request");
  res.json({ status: "received" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
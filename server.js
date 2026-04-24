const express = require("express");
const app = express();

app.use(express.json());

const VERIFY_TOKEN = "12345"; // must match Meta dashboard

// ✅ Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("GET webhook:", req.query);

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ VERIFIED");
    return res.status(200).send(challenge);
  }

  console.log("❌ VERIFICATION FAILED");
  return res.sendStatus(403);
});

// ✅ Incoming messages handler
app.post("/webhook", (req, res) => {
  console.log("📩 Incoming message:");
  console.dir(req.body, { depth: null });

  res.sendStatus(200);
});

// ✅ IMPORTANT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
const express = require("express");
const app = express();

app.use(express.json());

const VERIFY_TOKEN = "EAAbaziPsqJABRbodKM8CEXTAZBZBevC3ni1eOL3T5hun9mUX8CZC560sEZB0pbHyarWTTi1XSPG4aATi79bYFj534xKLKrGcURgNConBUZCfSm0XMlgu7PFp8r8GuwM3oCWuNJTZAFmIh3zcjtlCwojfhAyvWgiyqmrVP43Xr0hzP4SaxHtordYqXA9m2UNXoSi7iNoWbMcZBq8o2kGnJQMMHTYbRoQBfUKchZBbxzeU3H2oM8ckqwVNmBTOPx3RcLF40tXFndKYT1H0XNpZCM2ZC8";

app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Webhook verified!");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// ✅ Receive messages
app.post("/webhook", (req, res) => {
    console.log("Incoming:", JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running"));
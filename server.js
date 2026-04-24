const express = require("express");
const app = express();

app.use(express.json());

// ✅ Receive messages
app.post("/webhook", (req, res) => {
    console.log("Incoming:", JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get("/webhook", (req, res) => {
    console.log("Query:", req.query);

    const VERIFY_TOKEN = "EAAbaziPsqJABRbodKM8CEXTAZBZBevC3ni1eOL3T5hun9mUX8CZC560sEZB0pbHyarWTTi1XSPG4aATi79bYFj534xKLKrGcURgNConBUZCfSm0XMlgu7PFp8r8GuwM3oCWuNJTZAFmIh3zcjtlCwojfhAyvWgiyqmrVP43Xr0hzP4SaxHtordYqXA9m2UNXoSi7iNoWbMcZBq8o2kGnJQMMHTYbRoQBfUKchZBbxzeU3H2oM8ckqwVNmBTOPx3RcLF40tXFndKYT1H0XNpZCM2ZC8";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log({ mode, token, challenge });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("✅ VERIFIED");
        return res.status(200).send(challenge);
    }

    console.log("❌ FAILED");
    return res.sendStatus(403);
});
app.listen(3000, () => console.log("Server running"));
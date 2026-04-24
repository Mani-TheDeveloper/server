const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;
const verifyToken = 12345;

// ✅ GET
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// ✅ POST
app.post('/', (req, res) => {
  console.log("📩 Incoming:");
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
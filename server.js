const express = require('express');
const app = express();

app.use(express.json());


// ✅ GET
app.get('/', (req, res) => {
  console.log(req)
  res.status(200).send(req.body);
});

app.post('/receive', (req, res) => {
  console.log(req)
  res.status(200).send(req.body);
});


app.listen(3000, () => {
  console.log(`Listening on 3000`);
});
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const headlines = [
  "Discover the Best of [name] in [location]!",
  "Why [name] is [location]'s Top Choice in 2025",
  "[name]: Your Go-To Spot in [location] for Quality",
  "Experience [name]'s Excellence in [location] Today",
];

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  res.json({
    rating: 4.3,
    reviews: 127,
    headline: `Why ${name} is ${location}'s Sweetest Spot in 2025`,
  });
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)]
    .replace('[name]', name)
    .replace('[location]', location);
  res.json({ headline: randomHeadline });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
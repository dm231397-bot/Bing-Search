require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Replace with your Bing Search API key and endpoint
const BING_API_KEY = process.env.BING_API_KEY;
const BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/search";

// Health check route
app.get('/', (req, res) => {
  res.send('Backend working successfully ✅');
});

// Bing search route
app.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const response = await axios.get(BING_ENDPOINT, {
      headers: { "Ocp-Apim-Subscription-Key": BING_API_KEY },
      params: { q: query, count: 10 } // adjust count as needed
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

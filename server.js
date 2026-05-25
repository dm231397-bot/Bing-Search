// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS so your frontend can call this server
app.use(cors());
app.use(express.json());

// Root route to test if backend is working
app.get("/", (req, res) => {
  res.send("Backend working successfully ✅");
});

// Route to search using Bing Search API
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Query parameter 'q' is required" });

  try {
    const response = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`, {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY, // Keep your key safe in Render environment variables
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with the Bing API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

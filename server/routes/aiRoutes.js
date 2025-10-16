const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/ai/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "http://13.201.88.142:11434/api/generate",
      {
        model: "llama3:8b",
        prompt,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    let text = "";
    const lines = response.data.split("\n");
    lines.forEach((line) => {
      if (line.trim()) {
        const json = JSON.parse(line);
        if (json.response) text += json.response;
      }
    });

    res.json({ response: text });
  } catch (error) {
    console.error("AI request failed:", error.message);
    res.status(500).json({ error: "Failed to connect to AI service" });
  }
});

module.exports = router;

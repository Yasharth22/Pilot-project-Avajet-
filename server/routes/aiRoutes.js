// server/routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // make sure node-fetch is installed

// POST /api/ai/chat
router.post("/ai/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const response = await fetch("http://43.204.36.202:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "phi3:mini", prompt }), // ⚡ use the smaller, faster model
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: "AI service failed", details: text });
    }

    const textData = await response.text();

    // parse lines
    let finalText = "";
    textData.split("\n").forEach(line => {
      if (!line.trim()) return;
      try {
        const json = JSON.parse(line);
        if (json.response) finalText += json.response;
      } catch {
        finalText += line;
      }
    });

    res.json({ response: finalText });
  } catch (err) {
    console.error("AI request failed:", err.message);
    res.status(500).json({ error: "Failed to connect to AI service" });
  }
});

module.exports = router;

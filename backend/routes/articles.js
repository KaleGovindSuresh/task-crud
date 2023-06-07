const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

// Create article route
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const article = new Article({ title, description, category });
    await article.save();
    res.status(201).json({ message: "Article created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get all articles route
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update article route
router.put("/:id", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    await Article.findByIdAndUpdate(req.params.id, {
      title,
      description,
      category,
    });
    res.json({ message: "Article updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete article route
router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;

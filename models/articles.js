const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articles = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  snippet: String,
  link: String,
  date: { type: String, required: true }
});

const Article = mongoose.model("Article", articles);

module.exports = Article;

const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  coverArt: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;

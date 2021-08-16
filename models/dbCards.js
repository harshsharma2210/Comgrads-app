import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  name: String,
  user: String,
  email: String,
  imgUrl: String,
  level: String,
  price: String,
  description: String,
  duration: String,
  category: String,
  language: String,
  certification: String,
  url: String,
});

export default mongoose.model("cards", cardSchema);

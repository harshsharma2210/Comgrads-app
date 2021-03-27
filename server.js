import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import Cards from "./models/dbCards.js";
import Cors from "cors";
import cards from "./routes/cards.js";
import path from "path";

// APP CONFIG
const app = express();
const port = process.env.PORT || 8000;

// MIDDLEWARE
app.use(express.json());
app.use(Cors());

// DB CONFIG
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("conneted to mongo yeahh");
});
db.on("error", (err) => {
  console.log("err connecting", err);
});

// API ENDPOINTS
app.use(cards);

// HEROKU
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// LISTERNER
app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});

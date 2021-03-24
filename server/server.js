import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import Cards from "./models/dbCards.js";
import Cors from "cors";

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
app.get("/", (req, res) => {
  res.status(200).send("Hello Clever Programmer");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});
app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});

// LISTERNER
app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});

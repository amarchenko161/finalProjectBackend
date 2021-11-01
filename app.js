const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Schema = mongoose.Schema;

const buySchema = new Schema({
  shop: String,
  price: Number,
  date: String,
});

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://todoDB:restart987@cluster0.lnnws.mongodb.net/finalProject?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const Buy = mongoose.model("shop", buySchema);

app.get("/allShop", (req, res) => {
  Buy.find().then((result) => {
    res.send({ data: result });
  });
});

app.post("/createShop", (req, res) => {
  const buy = new Buy(req.body);
  buy.save().then((result) => {
    res.send({ data: result });
  });
});

app.delete("/deleteShop", (req, res) => {
  Buy.deleteOne({ _id: req.query._id }).then((result) => {
    Buy.find().then((result) => {
      res.send({ data: result });
    });
  });
});

app.patch("/updateShop", (req, res) => {
  console.log("req.body._id", req.body);
  Buy.updateOne({ _id: req.body._id }, req.body).then((result) => {
    // console.log('result', result);
    Buy.find().then((result) => {
      res.send({ data: result });
    });
  });
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

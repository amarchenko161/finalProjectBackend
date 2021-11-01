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
  if (req.body.hasOwnProperty("shop") && req.body.hasOwnProperty("price") && req.body.hasOwnProperty("date")) {
    const buy = new Buy(req.body);
    buy.save().then((result) => {
      res.send({ data: result });
    });
  } else {
    res.status(404).send("Error");
  }
});

app.delete("/deleteShop", (req, res) => {
  if (req.query._id) {
    Buy.deleteOne({ _id: req.query._id }).then((result) => {
      Buy.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(404).send("Error");
  }
});

app.patch("/updateShop", (req, res) => {
  if (req.query._id){
    if (req.body.hasOwnProperty("shop") || req.body.hasOwnProperty("price") || req.body.hasOwnProperty("date")) {
      Buy.updateOne({ _id: req.body._id }, req.body).then((result) => {
        Buy.find().then((result) => {
          res.send({ data: result });
        });
      });
    }else {
      res.status(404).send("Error");
    }
  } else {
    res.status(404).send("Error");
  }
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

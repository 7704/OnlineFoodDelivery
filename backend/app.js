const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");


const port = 8000;

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://shu7704:shubham%40987654321@cluster0.rbmwn35.mongodb.net/online-food?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((error) => console.log("Failed to connect to MongoDB Atlas", error));

// Create a schema for the contact data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String
});

// Create a model for the contact data
const Contact = mongoose.model("Contact", contactSchema);

// Configure app to use bodyParser
app.use(bodyParser.json());

app.use(cors());


// Handle POST requests to /contact
const postpage = async (req, res) => {
  // Create a new Contact object from the POST data
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,  
    phone: req.body.phone,
    address: req.body.address
  });

  // Save the new contact to the database
  newContact.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving contact to database");
    } else {
      res.status(201).send("Order saved to database");
    }
  });
}
app.post("/checkout", postpage);


// module.exports = app;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

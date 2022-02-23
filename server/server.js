const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 4242;

// Mongo DB conncetion
const database = process.env.MONGODB_URI;

mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
const authRoutes = require("./routes/Auth");
const itemRoutes = require("./routes/Item");
const menuCategoriesRoutes = require("./routes/MenuCategory");
const draftCartRoutes = require("./routes/DraftCart");
const checkoutRoutes = require("./routes/Checkout");
const stripeRoutes = require("./routes/Stripe");

// Usage of routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/menu-categories", menuCategoriesRoutes);
app.use("/api/draft-cart", draftCartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/stripe", stripeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://sampreetg45:sampreetg45@cluster0.h6he74i.mongodb.net/webiniser?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB Connection established");
  })
  .catch((err) => {
    console.log(err);
  });

// Import routes
const routes = require("./routes/routes");
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

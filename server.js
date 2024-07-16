const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // This enables CORS for all routes

// Define your routes
app.get("/api/gstdetails/:gstNo", (req, res) => {
  // Your API logic here
});

// Start your server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});

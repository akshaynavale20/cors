const express = require("express");
const app = express();
const path = require("path");

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (if needed)
app.use(express.static("public"));

// Route to handle embedding functionality
app.get("/", (req, res) => {
  const embedUrl = req.query.embedUrl || "";

  // Generate shareable iframe code
  const shareableEmbedCode = `<iframe src="${req.protocol}://${req.get("host")}/?embedUrl=${encodeURIComponent(embedUrl)}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;

  // Render the page using the EJS template
  res.render("embed", {
    embedUrl,
    shareableEmbedCode,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

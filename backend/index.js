const express = require("express");
const cors = require("cors");

const app = express();
const productRoutes = require("./routes/products");
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Tech Store API running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



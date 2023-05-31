require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./config/dbConnection");

connectDB();

const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listenning on port: ${PORT}`);
});

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Route refund to refund
app.use("/refund", require("./routes/refund"));

app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT);
});
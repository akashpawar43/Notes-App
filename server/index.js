const express = require('express');
const connectToMongo = require('./db');
const dotenv = require('dotenv').config();

// database connection
connectToMongo();

const PORT = process.env.PORT;
const app = express();

// middleware 
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

// app listening on port 5555
app.listen(PORT, () => {
    console.log(`server running at Port http://localhost:${PORT}`);
})
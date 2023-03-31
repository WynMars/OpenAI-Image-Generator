require('dotenv').config()
// const cors = require("cors");

const express = require('express');
const connectDB = require('./db');

const app = express();


// Connect Database
connectDB();

// app.use(cors());

// Init Middleware(before was bodyparser)
app.use(express.json({extended: false}));


// Define Routes
app.use("/api/openai", require("./routes/api/openai"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));


app.get('/', (req, res) => res.send('AI Image Generator'));


const PORT = process.env.WEBSITES_PORT || 8080;
// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const node_env = process.env.APPSETTING_NODE_ENV;

if (node_env === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
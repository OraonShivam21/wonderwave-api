const express = require("express");
const cors = require("cors");

const apiData = require("./data.json");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(apiData);
})

app.get("/users", (req, res) => {
    res.send(apiData.users);
})

app.get("/users/:id", (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
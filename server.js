const express = require("express");
const cors = require("cors");

const apiData = require("./data.json");
let lastPackageID = apiData.packages[apiData.packages.length - 1].packageID;

const app = express();
// middleware to accept json data
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  try {
    res.send(apiData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/users", (req, res) => {
  try {
    res.send(apiData.users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/services", (req, res) => {
  try {
    res.send(apiData.services);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/packages", (req, res) => {
  try {
    res.send(apiData.packages);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/packages", (req, res) => {
  try {
    const newPackage = req.body;
    lastPackageID++;
    newPackage.packageID = lastPackageID;
    apiData.packages.push(newPackage);
    res.status(200).json(newPackage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

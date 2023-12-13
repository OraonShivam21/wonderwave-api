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

app.post("/login", (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.password) {
      res.status(400).send("Bad request, required username and password both");
    }

    const user = apiData.users.find((u) => u.username === req.body.username);
    if (user == null) {
      res.status(400).send({ error: `Cannot find user: ${req.body.username}` });
    } else {
      res.status(200).send({ response: "OK" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
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

app.get("/users/:id", (req, res) => {
  try {
    const user = apiData.users.find((u) => u.userID === req.params.id);
    if (user == null) {
      res
        .status(400)
        .send({ error: `Cannot find user: ${req.params.username}` });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/services", (req, res) => {
  try {
    res.send(apiData.services);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/packages", (req, res) => {
  try {
    res.send(apiData.packages);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/packages/:packageID", (req, res) => {
  try {
    const package = apiData.packages.find(
      (package) => package.packageID === req.params.packageID
    );
    if (package == null) {
      res
        .status(400)
        .send({ error: `Cannot find package: ${req.params.packageID}` });
    } else {
      res.status(200).send(package);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
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

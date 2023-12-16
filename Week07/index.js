const express = require("express");
const apiRouter = require("./api");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.get("/", (req, res) => res.send("alooo"));

app.use("/", apiRouter);

app.listen(8080, () => console.log("Server is listening on port 8080"));
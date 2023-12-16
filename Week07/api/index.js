const router = require("express").Router();
const eventRouter = require("./event/router");

router.use("/event", eventRouter);

module.exports = router;
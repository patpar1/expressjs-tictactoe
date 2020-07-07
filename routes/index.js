var express = require("express");
var router = express.Router();

var game_controller = require("../controllers/gameController");

/* GET home page. */
router.get("/", game_controller.index);

router.get("/game", game_controller.getGame);

router.post("/update", game_controller.updateBoard);

router.post("/create", game_controller.createGame);

router.post("/clear", game_controller.clearBoard);

module.exports = router;

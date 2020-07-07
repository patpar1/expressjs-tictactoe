var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var gameSchema = new Schema({
  board: [],
  playerTurn: { type: String },
  finished: { type: Boolean }
});

module.exports = mongoose.model("games", gameSchema);

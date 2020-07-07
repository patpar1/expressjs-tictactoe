var Game = require("../models/game");

exports.index = function(req, res, next) {
  Game.findOne().exec(function(err, game) {
    if (err) {
      return next(err);
    }
    var board;
    if (game !== null) {
      board = game.board;
    } else {
      board = Array(9).fill("");
    }
    res.render("game", {
      title: "TicTacToe",
      game_board: board
    });
  });
};

exports.getGame = function(req, res, next) {
  Game.findOne().exec(function(err, game) {
    if (err) {
      return next(err);
    }
    if (!game) {
      res.redirect("/create");
    }
    res.send(game);
  });
};

exports.createGame = function(req, res, next) {
  var game = new Game({
    board: new Array(9).fill(""),
    playerTurn: "x",
    finished: false
  });

  game.save(function(err) {
    if (err) {
      return next(err);
    }
    // Successful - redirect to new book record.
    res.redirect("/game");
  });
};

exports.updateBoard = function(req, res, next) {
  var data;
  if (req.body.data === null) {
    data = {
      board: new Array(9).fill(""),
      playerTurn: "x",
      finished: false
    };
  } else {
    data = req.body;
  }
  Game.findOneAndUpdate({}, data).exec();
  res.redirect("/");
};

exports.clearBoard = function(req, res, next) {
  Game.findOneAndUpdate(
    {},
    {
      board: new Array(9).fill(""),
      playerTurn: "x",
      finished: false
    }
  ).exec();
  res.redirect("/");
};

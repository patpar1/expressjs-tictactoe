const board_size = 3;
let board = new Array(board_size * board_size).fill("");

let player_turn = "x";
let moves = 0;
let finished = false;

function checkWin() {
  var matches = ["xxx", "ooo"];
  var checks = [
    board[0] + board[1] + board[2],
    board[3] + board[4] + board[5],
    board[6] + board[7] + board[8],
    board[0] + board[3] + board[6],
    board[1] + board[4] + board[7],
    board[2] + board[5] + board[8],
    board[0] + board[4] + board[8],
    board[2] + board[4] + board[6]
  ];

  for (var i = 0; i < checks.length; i++) {
    if (checks[i] === matches[0] || checks[i] === matches[1]) {
      return true;
    }
  }
  return false;
}

function squareClick(boardSlot) {
  if (finished) {
    return;
  }
  fetch("/game")
    .then(resp => resp.json())
    .then(function(data) {
      board = data.board;
      player_turn = data.playerTurn;
      finished = data.finished;
    })
    .then(function() {
      if (board[boardSlot] !== "") {
        return;
      }
      board[boardSlot] = player_turn;
      document.getElementById("s" + boardSlot).textContent = player_turn;
      moves++;

      if (checkWin()) {
        alert("Player " + (player_turn === "x" ? "1" : "2") + " won!");
        finished = true;
      } else if (moves === board_size * board_size) {
        alert("Draw!");
        finished = true;
      } else {
        player_turn = player_turn === "x" ? "o" : "x";
      }

      var data = {
        board: board,
        playerTurn: player_turn,
        finished: false
      };

      fetch("/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    });
}

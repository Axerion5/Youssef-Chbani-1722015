var hasWon = false;
window.rollDice = ()=>{
  if (hasWon) {
    return;
  }
  const max = 6;
  const roll = Math.ceil(Math.random() * max);
  console.log("You rolled", roll);
  let currentPlayer = players[currentPlayerTurn];
  currentPlayer.position += roll;
  ladders.forEach(ladder=>{
    if (ladder.start === currentPlayer.position) {
      console.log("You stepped on a ladder!");
      currentPlayer.position = ladder.end;
    }
  });

  if (currentPlayer.position > 24) {
    console.log( currentPlayer.name +" has won!");
    hasWon = true; 
  }

  if (currentPlayer.position === position) {
    const diff = currentPlayer.position - position;
    currentPlayerPosition = position - diff;
  }

  currentPlayerTurn ++;
  if (currentPlayerTurn >= players.length) {
    currentPlayerTurn = 0;
  }
  renderBoard();
}

const players = [{
  name:"Player 1",
  position: 0,
  color: "gold"
},{
  name:"Player 2",
  position: 0,
  color: "white"
}];

let currentPlayerTurn = 0;

const width = 5;
const height = 4;
const board = [];
let position = 0;
let blackSquare = false;
const ladders = [{
  start:  7,
  end:  14
},{
  start: 18,
  end: 23
},{
  start: 14,
  end: 4
},{
  start: 22,
  end: 15
}];

for (var y = height; y >= 0; y--) {
  let row = [];

  board.push(row);
  for (var x = 0; x < width; x++) {

    row.push({x,y,occupied:null,position,color: blackSquare ? "steelblue" : "silver"});
    blackSquare = !blackSquare;
    position ++;
  }
}

const boardSizeConst = 50;
const renderBoard = ()=>{
  let boardHTML = ``;
  board.forEach(row=>{
    row.forEach(square=>{
      boardHTML += `<div class=square style="top:${square.y * boardSizeConst}px; left:${square.x * boardSizeConst}px; background-color:${square.color}"></div>`
    });
  });

  players.forEach(player=>{
    let square = null;
    board.forEach(row=>{
    row.forEach(square=>{
          if (square.position === player.position) {
            boardHTML += `<div class=player style="top:${square.y * boardSizeConst + 5}px; left:${square.x * boardSizeConst + 5}px;background-color:${player.color}"></div>`;
          }
      });
    });
  });

  ladders.forEach(ladder=>{

    //let start = 0;
    let startPos = {x:0,y:0};
    let endPos = {x:0,y:0};

    board.forEach(row=>{
      row.forEach(square=>{
        if (square.position === ladder.start) {
          startPos.x = square.x * boardSizeConst;
          startPos.y = square.y * boardSizeConst;
        }

        if (square.position === ladder.end) {
          endPos.x = square.x * boardSizeConst;
          endPos.y = square.y * boardSizeConst;
        }
      });
    });

    const isLadder = ladder.end > ladder.start;

    drawLine({color : isLadder ? "green" : "red",startPos,endPos});
  });
  document.getElementById("board").innerHTML = boardHTML;
}

function drawLine({color,startPos,endPos}){

  var c=document.getElementById("canvas");
  var ctx=c.getContext("2d");
  ctx.beginPath();
  const sizeRatio = 1;
  ctx.moveTo(startPos.x + 20,startPos.y + 20);
  ctx.lineTo(endPos.x + 20,endPos.y + 20 );

  ctx.lineWidth = 15;
  ctx.strokeStyle = color;
  ctx.stroke();
}

renderBoard();

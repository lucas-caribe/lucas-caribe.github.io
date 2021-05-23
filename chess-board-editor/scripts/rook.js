// (x, y) from 0 to 7
let rookPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let opponentPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let canCapture = false;

console.log(`
    Rook's position: ${rookPos.x}, ${rookPos.y} 
    Opponent's position: ${opponentPos.x}, ${opponentPos.y}
`);

if (rookPos.x === opponentPos.x || rookPos.y === opponentPos.y) {
  canCapture = true;
}

console.log(`Can the rook capture the opponent's piece? ${canCapture}`);

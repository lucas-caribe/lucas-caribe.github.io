// (x, y) from 0 to 7
let bishopPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let opponentPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let canCapture = false;

console.log(`
    Bishop's position: ${bishopPos.x}, ${bishopPos.y} 
    Opponent's position: ${opponentPos.x}, ${opponentPos.y}
`);

let diff = {
  x: Math.abs(bishopPos.x - opponentPos.x),
  y: Math.abs(bishopPos.y - opponentPos.y),
};

if (diff.x === diff.y) {
  canCapture = true;
}

console.log(`Can the bishop capture the opponent's piece? ${canCapture}`);

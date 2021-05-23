// (x, y) from 0 to 7
let queenPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let opponentPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let canCapture = false;

console.log(`
    Queen's position: ${queenPos.x}, ${queenPos.y} 
    Opponent's position: ${opponentPos.x}, ${opponentPos.y}
`);

let diff = {
  x: Math.abs(queenPos.x - opponentPos.x),
  y: Math.abs(queenPos.y - opponentPos.y),
};

if (
  diff.x === diff.y ||
  queenPos.x === opponentPos.x ||
  queenPos.y === opponentPos.y
) {
  canCapture = true;
}

console.log(`Can the queen capture the opponent's piece? ${canCapture}`);

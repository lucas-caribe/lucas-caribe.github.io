let knightCaptureX = [-1, -2, -2, -1, 1, 2, 2, -1];
let knightCaptureY = [-2, -1, 1, 2, 2, 1, -1, -2];

// (x, y) from 0 to 7
let knightPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let opponentPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let canCapture = false;

console.log(`
    Knight's position: ${knightPos.x}, ${knightPos.y} 
    Opponent's position: ${opponentPos.x}, ${opponentPos.y}
`);

// checking all the eight possibilities
for (let i = 0; i < 8; i++) {
  let candidateX = knightCaptureX[i] + knightPos.x;
  let candidateY = knightCaptureY[i] + knightPos.y;

  if (candidateX < 0 || candidateX > 7) continue;
  if (candidateY < 0 || candidateY > 7) continue;

  let knightCheckX = candidateX === opponentPos.x;
  let knightCheckY = candidateY === opponentPos.y;

  if (knightCheckX && knightCheckY) {
    canCapture = true;
    break;
  }
}

console.log(`Can the knight capture the opponent's piece? ${canCapture}`);

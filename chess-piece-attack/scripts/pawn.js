let pawnCaptureX = [-1, -1];
let pawnCaptureY = [-1, 1];

// (x, y) from 0 to 7
let pawnPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let opponentPos = {
  x: Math.floor(Math.random() * 8),
  y: Math.floor(Math.random() * 8),
};

let canCapture = false;

console.log(`
    Pawn's position: ${pawnPos.x}, ${pawnPos.y} 
    Opponent's position: ${opponentPos.x}, ${opponentPos.y}
`);

for (let i = 0; i < 2; i++) {
  let candidateX = pawnCaptureX[i] + pawnPos.x;
  let candidateY = pawnCaptureY[i] + pawnPos.y;

  if (candidateX < 0 || candidateX > 7) continue;
  if (candidateY < 0 || candidateY > 7) continue;

  let pawnCheckX = candidateX === opponentPos.x;
  let pawnCheckY = candidateY === opponentPos.y;

  if (pawnCheckX && pawnCheckY) {
    canCapture = true;
    break;
  }
}

console.log(`Can the pawn capture the opponent's piece? ${canCapture}`);

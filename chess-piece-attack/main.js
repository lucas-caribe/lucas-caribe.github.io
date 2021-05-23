let board = document.querySelector('.board');
let selectors = document.querySelectorAll('.selector');

let selectedPiece;
let placedWhitePiece = { x: -1, y: -1, type: '' };
let placedBlackPiece = { x: -1, y: -1, type: '' };

// board generator
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if ((i + j) % 2 === 0)
      board.innerHTML += `<div class="square light" data-x="${i}" data-y="${j}"></div>`;
    else
      board.innerHTML += `<div class="square dark" data-x="${i}" data-y="${j}"></div>`;
  }
}

function clearBoard() {
  let squares = document.querySelectorAll('.square');

  squares.forEach((square) => square.removeAttribute('piece'));
}

function getSquare(x, y) {
  return document.querySelector(`[data-x='${x}'][data-y='${y}']`);
}

function getPosition(square) {
  let x = square.dataset.x;
  let y = square.dataset.y;

  return { x, y };
}

function removePiece(x, y) {
  let square = getSquare(x, y);

  square.removeAttribute('piece');
}

function setPiece(piece, destination) {
  let { x, y } = getPosition(destination);

  if (/white*/.test(piece)) {
    if (placedWhitePiece.type !== '')
      removePiece(placedWhitePiece.x, placedWhitePiece.y);

    placedWhitePiece = { x, y, type: piece };
  } else {
    if (placedBlackPiece.type !== '')
      removePiece(placedBlackPiece.x, placedBlackPiece.y);

    placedBlackPiece = { x, y, type: piece };
  }

  if (destination) destination.setAttribute('piece', piece);
}

board.addEventListener('click', (event) => {
  let targetX = event.target.getAttribute('data-x');
  let targetY = event.target.getAttribute('data-y');

  if (!selectedPiece) return;

  let destination = getSquare(targetX, targetY);

  setPiece(selectedPiece, destination);
});

selectors.forEach((selector) => {
  selector.addEventListener('click', (event) => {
    let target = event.target;
    let previousSelected = document.querySelector('.selector > *[selected]');

    if (target.getAttribute('trash') !== null) {
      clearBoard();
      return;
    }

    if (target.getAttribute('pointer') !== null) {
      return;
    }

    if (previousSelected) previousSelected.removeAttribute('selected');

    target.setAttribute('selected', '');

    selectedPiece = target.getAttribute('piece');
  });
});

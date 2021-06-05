const pixelBoardId = '#pixel-board';
const colorPaletteId = '#color-palette';
const colors = ['#000', '#f00', '#080', '#00f', '#ff0', '#fa0', '#808', '#822'];

const maxBoardSize = 40;
const minBoardSize = 5;

const maxPixelSize = 40;
const minPixelSize = 8;

let pixelSize = 40;
let boardSize = 14;

// board and color palette
function createColorDiv(color, index) {
	const colorDiv = document.createElement('div');
	colorDiv.className = 'color';
	colorDiv.id = `color${index}`;
	colorDiv.style.backgroundColor = color;

	return colorDiv;
}

function createColorInput(color, index) {
	const colorInput = document.createElement('input');
	colorInput.type = 'color';
	colorInput.id = `color${index}-input`;
	colorInput.value = color;

	return colorInput;
}

function setColors() {
	const colorPalette = document.querySelector(colorPaletteId);

	for (let i = 0; i < colors.length; i += 1) {
		colorPalette.appendChild(createColorDiv(colors[i], i));
		colorPalette.appendChild(createColorInput(colors[i], i));
	}

	colorPalette.firstElementChild.classList.add('selected');
}

function setPixelBoard(bSize, pSize) {
	const pixelBoard = document.querySelector(pixelBoardId);
	pixelBoard.innerHTML = '';
	pixelBoard.style.width = `${pSize * bSize}px`;
	pixelBoard.style.height = `${pSize * bSize}px`;
	pixelBoard.style.gridTemplateColumns = `repeat(${bSize}, 1fr)`;
	pixelBoard.style.gridTemplateRows = `repeat(${bSize}, 1fr)`;

	for (let i = 0; i < bSize; i += 1) {
		for (let j = 0; j < bSize; j += 1) {
			const pixel = document.createElement('div');
			pixel.className = 'pixel';
			pixel.style.width = `${pSize}px`;
			pixel.style.height = `${pSize}px`;
			pixelBoard.appendChild(pixel);
		}
	}
}

function addColorPaletteEventListener() {
	const colorPalette = document.querySelector(colorPaletteId);
	colorPalette.addEventListener('click', (event) => {
		const { target } = event;
		const { classList } = target;

		if (!classList.contains('selected') && classList.contains('color')) {
			const currentSelected = document.querySelector('.selected');

			if (currentSelected) currentSelected.classList.remove('selected');

			target.classList.add('selected');
		}
	});
}

function decToHex(number) {
	const hex = Number(number).toString(16);

	return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(rgb) {
	const [r, g, b] = rgb
		.replace('rgb(', '')
		.replace(')', '')
		.replace(/,/g, '')
		.split(' ');

	return `#${decToHex(r)}${decToHex(g)}${decToHex(b)}`;
}

function addColorPaletteEditorEventListener() {
	const colorPalette = document.querySelector(colorPaletteId);

	colorPalette.addEventListener('contextmenu', (event) => {
		event.preventDefault();

		if (event.target.classList.contains('color')) {
			event.preventDefault();

			const inputId = `#${event.target.id}-input`;
			const input = document.querySelector(inputId);

			input.value = rgbToHex(event.target.style.backgroundColor);

			input.click();
		}
		return false;
	});
}

function addColorInputEventListener() {
	const colorInputs = document.querySelectorAll('input[type=color]');

	colorInputs.forEach((input) => {
		input.addEventListener('change', (event) => {
			const colorId = `#${event.target.id.replace('-input', '')}`;
			const color = document.querySelector(colorId);

			const currentSelected = document.querySelector('.selected');
			if (currentSelected) currentSelected.classList.remove('selected');

			color.classList.add('selected');
			color.style.backgroundColor = event.target.value;
		});
	});
}

function addPixelBoardEventListener() {
	const pixelBoard = document.querySelector(pixelBoardId);
	pixelBoard.addEventListener('click', (event) => {
		event.preventDefault();
		const { target } = event;

		if (target.className === 'pixel') {
			const currentSelected = document.querySelector('.selected');
			const currentColor = currentSelected.style.backgroundColor;

			target.setAttribute('prevColor', currentColor);
			target.style.backgroundColor = currentColor;
		}
	});
}

function addPixelBoardMouseOver() {
	const pixelBoard = document.querySelector(pixelBoardId);
	pixelBoard.addEventListener('mouseover', (event) => {
		event.preventDefault();
		const { target } = event;

		if (target.className === 'pixel') {
			const currentSelected = document.querySelector('.selected');
			const currentColor = currentSelected.style.backgroundColor;

			target.setAttribute('prevColor', target.style.backgroundColor);
			target.style.backgroundColor = currentColor;
		}
	});
}

function addPixelBoardMouseOut() {
	const pixelBoard = document.querySelector(pixelBoardId);
	pixelBoard.addEventListener('mouseout', (event) => {
		event.preventDefault();
		const { target } = event;

		if (target.className === 'pixel' && event.buttons !== 1) {
			target.style.backgroundColor = target.getAttribute('prevColor');
		}
	});
}

// inputs
function addClearBoardEventListener() {
	const clearButton = document.querySelector('#clear-board');

	clearButton.addEventListener('click', (event) => {
		event.preventDefault();

		const pixels = document.querySelectorAll('.pixel');

		for (let i = 0; i < pixels.length; i += 1) {
			pixels[i].style.backgroundColor = 'white';
		}
	});
}

function handleGenerateBoardClick(event) {
	event.preventDefault();
	const boardSizeInput = document.querySelector('#board-size');

	if (!boardSizeInput.value) {
		alert('Invalid board size!');
	} else {
		boardSize = boardSizeInput.value;

		if (boardSize < minBoardSize) boardSize = minBoardSize;
		else if (boardSize > maxBoardSize) boardSize = maxBoardSize;

		setPixelBoard(boardSize, pixelSize);
	}
	boardSizeInput.placeholder = boardSize;
	boardSizeInput.value = '';
}

function addGenerateBoardEventListener() {
	const generateBoardButton = document.querySelector('#generate-board');

	generateBoardButton.addEventListener('click', handleGenerateBoardClick);
}

function addBoardSizeInputEventListener() {
	const boardSizeInput = document.querySelector('#board-size');
	boardSizeInput.placeholder = String(boardSize);
	boardSizeInput.min = String(minBoardSize);
	boardSizeInput.max = String(maxBoardSize);

	boardSizeInput.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			const generateBoardButton = document.querySelector('#generate-board');

			generateBoardButton.click();
		}
	});
}

function handlePixelSizeButtonClick(event) {
	event.preventDefault();
	const pixelSizeInput = document.querySelector('#pixel-size');

	if (!pixelSizeInput.value) {
		alert('Invalid pixel size!');
	} else {
		pixelSize = pixelSizeInput.value;

		if (pixelSize < minPixelSize) pixelSize = minPixelSize;
		else if (pixelSize > maxPixelSize) pixelSize = maxPixelSize;

		setPixelBoard(boardSize, pixelSize);
	}
	pixelSizeInput.placeholder = pixelSize;
	pixelSizeInput.value = '';
}

function addPixelSizeEventListener() {
	const changePixelSizeButton = document.querySelector('#change-pixel-size');

	changePixelSizeButton.addEventListener('click', handlePixelSizeButtonClick);
}

function addPixelInputEventListener() {
	const pixelSizeInput = document.querySelector('#pixel-size');
	pixelSizeInput.placeholder = String(pixelSize);
	pixelSizeInput.min = String(minPixelSize);
	pixelSizeInput.max = String(maxPixelSize);

	pixelSizeInput.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			const pixelSizeButton = document.querySelector('#change-pixel-size');

			pixelSizeButton.click();
		}
	});
}

function addToggleHeaderEventListener() {
	const arrow = document.querySelector('.arrow');
	const header = document.querySelector('header');
	const headerHeight = window.getComputedStyle(header).height;

	arrow.addEventListener('click', () => {
		const headerMarginTop = window.getComputedStyle(header).marginTop;

		if (headerMarginTop === '0px') {
			arrow.style.backgroundImage = 'url("./assets/angle-down-solid.svg")';
			header.style.marginTop = `-${headerHeight}`;
		} else {
			arrow.style.backgroundImage = 'url("./assets/angle-up-solid.svg")';
			header.style.marginTop = '0px';
		}
	});
}

window.onload = () => {
	setColors();
	setPixelBoard(boardSize, pixelSize);
	addColorPaletteEventListener();
	addColorPaletteEditorEventListener();
	addColorInputEventListener();
	addPixelBoardEventListener();
	addPixelBoardMouseOver();
	addPixelBoardMouseOut();
	addClearBoardEventListener();
	addGenerateBoardEventListener();
	addBoardSizeInputEventListener();
	addPixelSizeEventListener();
	addPixelInputEventListener();
	addToggleHeaderEventListener();
};

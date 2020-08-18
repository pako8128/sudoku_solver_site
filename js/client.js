const API_ADDRESS = 'https://sudokus-solver.herokuapp.com/api/solve';

const inputs = document.querySelectorAll('input');
const solveButton = document.querySelector('#solveButton');
const clearButton = document.querySelector('#clearButton');

function readSudoku() {
	const sudoku = [];
	for (var y = 0; y < 9; y++) {
		const row = [];

		for (var x = 0; x < 9; x++) {
			const num = inputs.item(y * 9 + x).value;
			if (num == "") {
				row[x] = 0;
			} else {
				row[x] = Number(num);
			}
		}

		sudoku[y] = row;
	}

	return sudoku;
}

function writeSudoku(sudoku) {
	for (var y = 0; y < 9; y++) {
		for (var x = 0; x < 9; x++) {
			inputs.item(y * 9 + x).value = sudoku[y][x];
		}
	}
}

function clearSudoku() {
	for (var y = 0; y < 9; y++) {
		for (var x = 0; x < 9; x++) {
			inputs.item(y * 9 + x).value = '';
		}
	}
}

function solveSudoku() {
	const sudoku = readSudoku();

	fetch(API_ADDRESS, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sudoku),
	})
		.then(resp => resp.json())
		.then(data => {
			if (data.error == null) {
				writeSudoku(data);
			} else {
				alert("That doesnt seem possible! Try again");
				clearSudoku();
			}
		});
}

solveButton.addEventListener('click', solveSudoku);
clearButton.addEventListener('click', clearSudoku);

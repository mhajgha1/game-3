let matrixA, matrixB, matrixC, missingRow, missingCol, correctAnswer;
let score = 0;
let hintUsed = false;

function createMatrix(rows, cols) {
    return Array.from({length: rows}, () => 
        Array.from({length: cols}, () => Math.floor(Math.random() * 5) + 1)
    );
}

function multiplyMatrices(a, b) {
    return a.map((row, i) =>
        b[0].map((_, j) =>
            row.reduce((sum, _, k) => sum + a[i][k] * b[k][j], 0)
        )
    );
}

function displayMatrix(matrix) {
    return '<table>' + matrix.map(row => 
        '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>'
    ).join('') + '</table>';
}

function newGame() {
    const sizes = [
        {a: [2, 2], b: [2, 2]},
        {a: [2, 3], b: [3, 2]},
        {a: [3, 2], b: [2, 3]},
        {a: [3, 3], b: [3, 3]}
    ];
    const size = sizes[Math.floor(Math.random() * sizes.length)];

    matrixA = createMatrix(size.a[0], size.a[1]);
    matrixB = createMatrix(size.b[0], size.b[1]);
    matrixC = multiplyMatrices(matrixA, matrixB);

    missingRow = Math.floor(Math.random() * size.a[0]);
    missingCol = Math.floor(Math.random() * size.b[1]);
    correctAnswer = matrixC[missingRow][missingCol];
    matrixC[missingRow][missingCol] = '?';

    document.getElementById('matrices').innerHTML = `
        ${displayMatrix(matrixA)} × 
        ${displayMatrix(matrixB)} = 
        ${displayMatrix(matrixC)}
    `;
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';
    removeHighlight();
    hintUsed = false;
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === correctAnswer) {
        document.getElementById('result').textContent = 'Correct!';
        if (hintUsed) {
            score += 0.5;
        } else {
            score += 1;
        }
        document.getElementById('score').textContent = score;
        setTimeout(newGame, 1500);
    } else {
        document.getElementById('result').textContent = 'Incorrect. Try again!';
    }
}

function showHint() {
    if (!hintUsed) {
        hintUsed = true;
        score -= 0.5;
        document.getElementById('score').textContent = score;
    }
    removeHighlight();
    const tables = document.getElementsByTagName('table');
    tables[0].rows[missingRow].classList.add('highlight');
    for (let i = 0; i < tables[1].rows.length; i++) {
        tables[1].rows[i].cells[missingCol].classList.add('highlight');
    }
}

function removeHighlight() {
    const highlighted = document.getElementsByClassName('highlight');
    while (highlighted.length > 0) {
        highlighted[0].classList.remove('highlight');
    }
}

window.onload = newGame;
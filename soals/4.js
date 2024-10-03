/**
 * @param {number[][]} matrix 
 * @returns {number} 
 */

function diagonalDifference(matrix) {
    const n = matrix.length;
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < n; i++) {
        primaryDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][n - i - 1];
    }

    const result =  Math.abs(primaryDiagonalSum - secondaryDiagonalSum);

	return `maka hasilnya adalah ${primaryDiagonalSum} - ${secondaryDiagonalSum} = ${result}`

}

const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

const result = diagonalDifference(matrix);
console.log(result);

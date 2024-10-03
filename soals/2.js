/**
 * @param sentence - 
 * @returns 
 */

function findLongestWord(sentence) {

	const words = sentence.trim().split(/\s+/);

    if (words.length === 0) {
        return "Please make setence brow !!!.";
    }

    let longestWord = words[0];

    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return `${longestWord}: ${longestWord.length} karakter`;
}

// Contoh penggunaan
const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(findLongestWord(sentence));

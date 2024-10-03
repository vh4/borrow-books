/**
 * @param input
 * @param query 
 * @returns 
 */

function countOccurrences(input, query){

	const frequencyMap = {};

    input.forEach(word => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

	return query.map(q => frequencyMap[q] || 0);
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

const OUTPUT = countOccurrences(INPUT, QUERY);
console.log(OUTPUT);

function reverseAlphabets(input) {

	const letters = input.replace(/[0-9]/g, '');
    const numbers = input.replace(/[^0-9]/g, '');
    
    const reversedLetters = letters.split('').reverse().join('');
    
    return reversedLetters + numbers; //
}

const input = "NEGIE1";
const result = reverseAlphabets(input);

//result...
console.log(result);

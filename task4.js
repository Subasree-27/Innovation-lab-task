//1) Reverse each word in a sentence
const reverseWordsInSentence = (sentence) => {
    return sentence
        .split(' ')
        .map(word => word.split('').reverse().join(''))
        .join(' ');
};

// Example:
console.log(reverseWordsInSentence("Hello world")); 
// Output: "olleH dlrow"

// 2) Remove duplicates from an array
const removeDuplicates = (arr) => {
    return [...new Set(arr)];
};

// Example:
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); 
// Output: [1, 2, 3, 4, 5]

//3) Count vowels in a string
const countVowels = (str) => {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
};

// Example:
console.log(countVowels("JavaScript is fun")); 
// Output: 5

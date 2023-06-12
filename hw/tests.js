const readline = require('readline');
const isPalindrome1 = require('./task12');
const isPalindrome2 = require('./task12');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const testPalindromes = (str) => {
    console.log(isPalindrome1(str));
    console.log(isPalindrome2(str));
};

const getUserInput = () => {
    rl.question('Введите строку: ', (str) => {
        testPalindromes(str);
        getUserInput();
    });
};

getUserInput();
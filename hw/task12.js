function isPalindrome1(str) {
    str = str.replace(/\s+/g, '').toLowerCase();

    for (let i = 0; i < Math.floor(str.length / 2); i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }

    return true;
}

module.exports = isPalindrome1;

function isPalindrome2(str) {
    const correctedString = str.replace(/\s+/g, '').toLowerCase()
    const reversedString = correctedString.split('').reverse().join('')
    return correctedString === reversedString
}

module.exports = isPalindrome2;
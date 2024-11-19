/*
 Write a JavaScript function to check whether an `input` is a string or not. 
Test Data :
console.log(is_string('w3resource'));
true
console.log(is_string([1, 2, 4, 0]));
false
*/
function is_string(input) {
    return typeof input === 'string';
}

console.log("07-01.js")
console.log(is_string('w3resource'));
console.log(is_string([1, 2, 4, 0]));
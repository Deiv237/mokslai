/*
Write a JavaScript function to remove specified number of characters from a string. 
Test Data :
console.log(truncate_string("Robin Singh",4));
"Robi"
*/
function truncate_string(input) {
    return input.slice(0, 4);
}

console.log("07-04.js");
console.log(truncate_string("Robin Singh",4));
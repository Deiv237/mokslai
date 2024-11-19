/*
Write a JavaScript function to parameterize a string. 
Test Data :
console.log(string_parameterize("Robin Singh from USA."));
"robin-singh-from-usa"
*/
function string_parameterize(str) {
    return str.toLowerCase().replaceAll(' ', '-').replace('.', '');
}

console.log("07-07.js");
console.log(string_parameterize("Robin Singh from USA."));
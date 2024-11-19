/*
 Write a JavaScript function to convert a string in abbreviated form. 
Test Data :
console.log(abbrev_name("Robin Singh"));
"Robin S."
*/

// function abbrev_name(input) {
//     return input.slice(0, 8).replaceAll('i', '.').replace('.', 'i');
// }
function abbrev_name(input) {
    const [firstName, lastName] = input.split(' ');
    if (!lastName) return firstName;
    return `${firstName} ${lastName[0]}.`;
  }

console.log("07-05.js");
console.log(abbrev_name("Robin Singh"));
/*
Write a JavaScript function to get the current date. 

Note : Pass a separator as an argument.
Test Data :
console.log(curday('/')); 
console.log(curday('-'));
Output :
"11/13/2014" 
"11-13-2014"
*/
function curday(separator) {
    const date = new Date();
    const day = String(date.getDate());
    const month = String(date.getDate());
    const year = date.getFullYear();

    return `${month}${separator}${day}${separator}${year}`;
}

console.log("06-02.js");
console.log(curday('/')); 
console.log(curday('-'));
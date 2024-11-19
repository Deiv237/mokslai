/*
Write a JavaScript function to hide email addresses to protect from unauthorized user. 
Test Data :
console.log(protect_email("robin_singh@example.com"));
"robin...@example.com"
*/
function protect_email(email) {
    // return input.slice(-11);
    const [localPart, domain] = email.split('@');
    const hiddenLocalPart = localPart.slice(0, Math.min(5, localPart.length)) + '...';
    return `${hiddenLocalPart}@ ${domain}`;
}

console.log("07-06.js");
console.log(protect_email("robin_singh@example.com"));
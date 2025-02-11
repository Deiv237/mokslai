// let person : {
//     name : string,
//     age : number,
// };

// person = { name: "40", age: 50}

// let coord : [number, number] = [50, 1545];

let data:unknown;

data = 50;
data = "Test";

data.toUpperCase(); // Error

if (typeof data === "string") {
    data.toUpperCase();
} // No Error
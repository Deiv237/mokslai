// const { log } = require("console");
const fs = require(`fs`);
const path = require(`path`);

console.log(__dirname);

const dir = path.join(__dirname, "data.txt");

console.log(dir);

const writeTofile = ()=>{
    fs.writeFile(dir, "Hello", (err)=>{
        if(err) {
            console.log(err);
            return;
        }

        console.log("File written successfully");
    });
};

// Read file
const readFile = ()=>{
    fs.readFile(dir, "utf8", (err, data)=>{
        if(err) {
            console.log(err);
            return;
        }

        console.log(data);
    });
};

writeTofile();
readFile();
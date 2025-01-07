const MyObject = {
    city: "Madrid",
    greet() {
        console.log(`Greetings from ${this.city}`);
    },
};
MyObject.city;
MyObject.greet();
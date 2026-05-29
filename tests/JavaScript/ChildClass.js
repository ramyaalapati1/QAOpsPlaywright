const Person = require("./Classes");

class Pet extends Person {
    constructor(fname, lname) {
        super(fname, lname);

    }
    get location() {
        return "BlueCross";
    }
}

let pet = new Pet("Jimmy", "Bones");
let fullname = pet.fullname();
console.log(fullname);
console.log(pet.location);
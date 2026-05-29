module.exports = class Person {
    age = 25;
    get location() {
        return "Singapore";

    }
    constructor(fname, lname) {
        this.fname = fname;
        this.lname = lname;
    }

    fullname() {
        return this.fname + this.lname;
    }
}
// let person = new Person("Ramya", "Krishna");

// console.log(person.age);
// console.log(person.location);
// let fullname = person.fullname();
// console.log(fullname);



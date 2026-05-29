//object is collection of properties

const { generateKey } = require("node:crypto");

let person = {
    fname: 'Ramya',
    lname: "Alapati",
    age: 37,
    fullname: function () {
        console.log(this.fname + this.lname);
    }

};
console.log(person.fullname());
console.log(person.fname);
console.log(person['lname']);
person.gender = 'male';
console.log(person);
delete person.gender;
console.log(person);

console.log('gender' in person);
person.gender = 'male';
//print all the values in JS object
for (let key in person) {
    console.log(person[key])
}

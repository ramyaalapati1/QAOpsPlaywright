const { connected } = require("node:process");

console.log("hello World");

let marks = Array(6);
let marks1 = new Array(10, 20, 30, 40, 50, 60);
var marks2 = [20, 30, 10, 40, 50];
console.log(marks2[3]);
marks2[3] = 5;
console.log(marks2);
console.log(marks2.length);
marks2.push(45);
console.log(marks2);
marks2.pop();
marks2.unshift(65);
console.log(marks2);
marks2.shift();
console.log(marks2);
console.log(marks2.indexOf(10));
console.log(marks2.includes(5));
let slice = marks2.slice(1, 4);
console.log(slice);
console.log(marks2);
let sum = 0;
for (let i = 0; i < marks2.length; i++) {
    console.log(marks2[i]);
    sum = sum + marks2[i];

}
console.log(sum);

let total = marks2.reduce((sum1, marks) => sum1 + marks, 0);
console.log(total);

let evenScore = [];
for (let i = 0; i < marks2.length; i++) {
    if (marks2[i] % 2 == 0)
        evenScore.push(marks2[i]);
};
console.log(evenScore);

let filterarr = marks2.filter(mark => mark % 2 == 0);
console.log(filterarr);
//map
let mapArry = filterarr.map(mark => mark * 2).reduce((su, mark) => su + mark, 0)
console.log(mapArry);

let age = [20, 15, 30, 5, 10, 35, 40];

let ageSum = age.filter(temp => temp % 2 == 0).map(temp => temp * 2).reduce((sum, tot) => sum + tot, 0);
console.log(ageSum);


const Person = require('./Classes');

let su = function (a, b) { return a + b };
console.log(su(2, 3));
let bu = (a, b) => a + b;
console.log(bu(5, 2));


let day = 'tuesday '
console.log(day.length);
console.log(day.slice(0, 4));
console.log(day[1]);
let splitDay = day.split('s');

console.log(splitDay[1].trim());

let a = '23';
let b = '15';
let diff = parseInt(a) - parseInt(b);
console.log(typeof (diff));
let diff1 = diff.toString();
console.log(typeof (diff1));

let newDay = day + "is funday"
console.log(newDay);
let val = newDay.indexOf('day');
console.log(val);
val = newDay.indexOf('day', 5);
console.log(val);
let val2 = newDay.indexOf('day');
let count = 0;
while (val2 !== -1) {
    count++;
    val2 = newDay.indexOf('day', val2 + 1);
}
console.log(count);

let per = new Person("Krishna", "Rajendra");
let fullname = per.fullname();
console.log(fullname);

let per1 = new Person("Kris", "hna");
let fullname1 = per1.fullname();
console.log(fullname1);



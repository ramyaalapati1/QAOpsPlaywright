let message1: String = "Hello Message";
message1 = "bye";
console.log(message1);

let age: number = 18;
console.log(age);

let isActive: boolean = false;
let numArray: number[] = [1, 2, 3, 4];

let pink: any = "I am pink";
pink = 12;

function add(a: number, b: number)
    : number {
    return a + b;
}
add(3, 4);
let user: { name: String, age: number } = { name: "ramya", age: 10 }
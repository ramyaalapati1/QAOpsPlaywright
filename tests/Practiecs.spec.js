const { test, expect, request, firefox } = require("@playwright/test");

test("Arrays", () => {

    const fruits = ["banana", "mango", "apple"];
    console.log(fruits[0]);
    fruits.push("Guave"); // push to end of Array
    console.log(fruits);
    fruits.pop("Guava"); //remove last element from array
    console.log(fruits);
    fruits.unshift("fig"); //Adds element to 1st place
    console.log(fruits);
    fruits.shift(); // remove 1st element
    console.log(fruits);
    console.log(fruits.indexOf("mango"));
    const bool = fruits.includes("banana");
    console.log(bool);
    const removedFruit = fruits.splice(1) // remove by index
    console.log(removedFruit);
    console.log(fruits);
    fruits.push("cherry");
    fruits.push("fig");
    fruits.push("melon");
    console.log(fruits);


    console.log("I am 1st");
    console.log("I am 2nd");
    console.log("I am 3");
    console.log("I am 4");
    console.log("I am 5");
    setTimeout(function () {
        console.log("I am 6")
    }, 300);
    console.log("I am 7");

}
);
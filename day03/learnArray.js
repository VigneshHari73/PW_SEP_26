//Hetrogeneous Array:
let arr = ["vignesh",28,"Male,8195038","NatWest",["Java","JS"],["Pw","Selenium","RESTAssured","Playwright","RESTAssured","Postman"]];
//Homogeneous Array:
let arr1 = [1,2,34,4,5,6,7,8,9,0];

console.log(typeof arr1) // object

//Remove element
//pop() method will remove the last index and returns it
console.log(arr1.pop()) //0
console.log(arr1)//[1,2,34,4,5,6,7,8,9]

//shift() method will remove the first element and retirns it
console.log(arr.shift()) //undefined
console.log(arr)

//Add element
//push() method will add the elemnt in last index and returns the new length of the arrays
console.log(arr1.push(0)) //10
console.log(arr1)//[1,2,34,4,5,6,7,8,9,0]


//Unshift() method will add the element in first index and returns the new length of the arrays
console.log(arr.unshift("Vignesh")) //6
console.log(arr) //[ "Vignesh", 1, 2, 34, 4, 5, 6, 7, 8, 9, "0" ]`
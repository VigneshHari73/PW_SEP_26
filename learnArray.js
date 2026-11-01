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
console.log("arr1"+arr1)//[1,2,34,4,5,6,7,8,9,0]


//Unshift() method will add the element in first index and returns the new length of the arrays
console.log(arr.unshift("Vignesh")) //6
console.log(arr) //[ "Vignesh", 1, 2, 34, 4, 5, 6, 7, 8, 9, "0" ]`

//Splice vs Slice
console.log("Sliced List: "+arr1.slice(1,4))

console.log("Original List: "+arr1)

const SplicedValue = arr1.splice(1,4,"v","d0","s","s","s")
const SlicedValue = arr1.slice(1,4)

console.log("SplicedValue List: "+SplicedValue)
console.log("SlicedValue List: "+SlicedValue)
console.log(arr1)


let oddValues = [1,3,"k",10]
oddValues.forEach(odd=>console.log(odd))

for(let i = 0;i<=4;i++){
    console.log(" ".repeat(4-i)+"* ".repeat(i)+" ".repeat(4-i))
}
for(let i = 4;i>=0;i--){
    console.log(" ".repeat(4-i)+"* ".repeat(i)+" ".repeat(4-i))
}


// let star = "*";
// for(let i = 1;i<5;i++){
// console.log(" ".repeat(i))
// console.log("Hi ".repeat(i))
// }
// for(let i = 5;i>0;i--){
// console.log()
// console.log("Hi ".repeat(i));
// }





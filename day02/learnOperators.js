let a = 5
let b = 3

//Arithmetic Operators
console.log("a + b = " + (a + b)) //   concat/Addition
console.log("a - b = " + (a - b)) //   Subtraction
console.log("a * b = " + (a * b)) //   Multiplication
console.log("a / b = " + (Math.floor(b / a)))//   Division
console.log("a / b = " + (b / a).toFixed(2))//   Division
console.log("a % b = " + (a % b)) //   Modulus
console.log("a ** b = " + (a ** b)) //   Exponentiation


//relational operators
console.log(a<b) //less than    
console.log("a>b"+a>b) //greater than
console.log("a<=b"+a<=b) //less than or equal to
console.log("a>=b"+a>=b) //greater than or equal to
console.log("a===b"+a===b) //equal to
console.log("a!=b"+a!=b) //not equal to

//Compound assignment operators
// a = a + b
console.log(a += b) // a = a + b    
console.log(a -= b) // a = a - b
console.log(a *= b) // a = a * b
console.log(a /= b) // a = a / b
console.log(a %= b) // a = a % b
console.log(a **= b) // a = a ** b

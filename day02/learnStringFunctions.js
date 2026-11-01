let courseName = "Playwright"
let companyName = "TCS"

//String Concatenation
console.log(companyName.includes("cs")) //False
console.log(companyName.indexOf("CS")) //1
console.log(companyName.lastIndexOf("CS")) //1
console.log(companyName.charAt(7)) //EMPTY
console.log(companyName.charAt(2)) //S  


//Slice
console.log(courseName.slice(1));
console.log(courseName.slice(1, 5));
console.log(courseName.slice(-1));  
console.log(courseName.slice(-5, -1));

//substring()vsslice()

let name = "Balameenakshi";

console.log(name.substring(0,4)) // Bala
console.log(name.slice(0,4)) // Bala

console.log(name.substring(4,0)) // Bala
console.log(name.slice(4,0)) // empty


//replace
let langName = "java java java";
console.log(langName.replace("java", "ts")) //ts ts ts
console.log(langName.replaceAll("java", "ts")) //ts ts ts

console.log(langName.split(" ")) //["java", "java", "java"] 


let rev = ""
for (let i = courseName.length - 1; i >= 0; i--) {
    rev += courseName.charAt(i)
}

console.log(rev) //htrowalp
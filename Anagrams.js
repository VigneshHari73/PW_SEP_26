

function isAnagramNamedFunction(str1,  str2){  
let alterdString1 = str1.toLowerCase().replaceAll(" ", "").split("").sort().join("");
let alterdString2 = str2.toLowerCase().replaceAll(" ", "").split("").sort().join("");
return alterdString1 === alterdString2
}

let isAnagramanonymous  = function(str3,str4){

let alterdString3 = str3.toLowerCase().replaceAll(" ", "").split("").sort().join("");
let alterdString4 = str3.toLowerCase().replaceAll(" ", "").split("").sort().join("");

return alterdString3===alterdString4
}

let isAnagramArraowFunction = (str5,str6) => {

let alteredText5 = str5.toLowerCase().replaceAll(" ","").split("").sort().join("");
let alteredText6 = str6.toLowerCase().replaceAll(" ","").split("").sort().join("");
return alteredText5 === alteredText6;
}

;(function(str7,str8){

let alteredText7 = str7.toLowerCase().replaceAll(" ","").split("").sort().join("");
let alteredText8 = str8.toLowerCase().replaceAll(" ","").split("").sort().join("");
console.log(alteredText7 === alteredText8);
 
})("Listen", "Silent")
    

console.log(isAnagramNamedFunction("listen","silent"));
console.log(isAnagramAnanamous("Listen", "Silent"));
console.log(isAnagramArraowFunction("conversation","voices rant on"));









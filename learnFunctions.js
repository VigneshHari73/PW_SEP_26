//namedFunction
function greet(){
 console.log("Welcome by named");   
}
greet()
//Anonymous function
let greetA = function(){
   console.log("Welcome by ananymous"); 
}
greetA()
let add = function(a,b){
    return a+b
}
console.log(add(1,2))

//Arrow Function
let multiplication = (a,b) => (a*b)
console.log(multiplication(2,3));
//IIFE
;(function(userName){
console.log(`Hey ${userName}, this is IIFE`); 
})("Vignesh")
//CallBack Function
function Recomendations(){
console.log("Track's the user watch history : langage,genre,cast,crew");
}

function aiRecommendation(){
    console.log("optimized the movie recommendation")
}

function profileLogin(userName,history,aiRecommendation){
    console.log(`Welcome, ${userName}`);
    history()
    aiRecommendation()   
}

profileLogin("vicky",Recomendations,aiRecommendation)





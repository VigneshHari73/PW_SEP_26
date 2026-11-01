let isPrime = true;

if(isPrime){
    console.log("The user has prime")
}
else{
    console.log("The user does not have prime")
}


let income = 10000.1

if(income<3000){
    console.log("The user has no tax ")
}
else if(income<=3000 && income<10000){
    console.log("The user has 10% tax")

}
else{
    console.log("The user has 30% tax")
}


let browser = "chrome"

switch(browser){

    case "chrome":
        console.log("The user has chrome browser")
        break;
    case "firefox":
        console.log("The user has firefox browser")
        break;
    default:
        console.log("The user has an unknown browser")
}


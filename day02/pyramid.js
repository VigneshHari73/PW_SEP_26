let stars = [1,2,3,4,5];
let space = [4,3,2,1,0];

for (let index = 0; index < stars.length; index++) {
   
    let line = (" ".repeat(space[index]))+("* ".repeat(stars[index]));

    
    console.log(line);
   
}
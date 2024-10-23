let snakeSpid = 10 ;
let snakeDirection ;
let snakeBody = [{left : 0 , top : 0 } , {left : 0 , top : 0 }];


function controlSnakeMove(){
    document.addEventListener("keydown" , (event)=>{
        if(event.key === "ArrowDown" && snakeDirection != 'up'){
            snakeDirection = "down";
        }else if(event.key === "ArrowUp" && snakeDirection != 'down'){
            snakeDirection = "up";
        }else if(event.key === "ArrowLeft" && snakeDirection != 'right'){
            snakeDirection = "left";
        }else if(event.key === "ArrowRight" && snakeDirection != 'left'){
            snakeDirection = "right";
        }
        console.log(event.key);
    })
    
}
controlSnakeMove();



function moveSneak(){
    let playField = document.getElementById("play-field");
    let sneakHead = snakeBody[0]
    setInterval(()=>{
        const {height , width}  = playField.getBoundingClientRect();
        
        for(let i = snakeBody.length-1; 0 < i; i--){
            snakeBody[i] = {...snakeBody[i-1]}
        }
        


        document.querySelectorAll(".snake-body").forEach((elem)=>{
            elem.remove();
        })
        if(snakeDirection === "right"){
            sneakHead.left += snakeSpid ;
        }
        if(snakeDirection === "left"){
            sneakHead.left -= snakeSpid ;
        }
        if(snakeDirection === "down"){
            sneakHead.top += snakeSpid ;
        }
        if(snakeDirection === "up"){
            sneakHead.top -= snakeSpid ;
        }

// ila khraj snake mn width o hight

        if(sneakHead.left > width){
            sneakHead.left = 0 ;
        }
        if(sneakHead.top > height){
            sneakHead.top = 0 ;
        }
        if(sneakHead.left < 0){
            sneakHead.left = width ;
        }

        if(sneakHead.top < 0){
            sneakHead.top = height ;
        }
        for(i = 0 ; i < snakeBody.length; i++){
            let sneakDiv = document.createElement("div");
            sneakDiv.style.left= snakeBody[i].left + "px" ;
            sneakDiv.style.top= snakeBody[i].top + "px" ;
            sneakDiv.classList.add("snake-body");
            playField.appendChild(sneakDiv);
        }


       const {left , top} = document.getElementById("snake-food-div").getBoundingClientRect();
       if(left ===  sneakHead.left  &&  top === sneakHead.top ){
        snakeBody.push({left: 0, top: 0})
        console.log(left , top);
        sneakFood();
       }
       
    } , 100)
   

}


moveSneak();


function sneakFood(){
    document.getElementById("snake-food-div")?.remove();
    const playField = document.getElementById("play-field");
    const {height , width} = playField.getBoundingClientRect();

const sneakFood = document.createElement("div");
sneakFood.setAttribute("id" , "snake-food-div")
const randomeTop = Math.round((Math.random() * height)/10) * 10;
const randomeleft = Math.round((Math.random() * width)/10) * 10;

console.log(randomeTop);
console.log(randomeleft);

sneakFood.style.top = randomeTop + "px";
sneakFood.style.left = randomeleft +"px" ;


playField.appendChild(sneakFood)

} 
sneakFood();
console.log("hello");
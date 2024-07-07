let boxes = document.querySelectorAll(".box"); //for accessing
let resetBtn = document.querySelector("#reset-btn"); //for accessing
let newGameBtn= document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");
let winner= document.querySelector("#winner");

let turnO = true; //playerX,playerO
let count= 0; //to check draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame= ()=>{ //when we click newgame btn
    turnO =true;
    count=0;
    enableBoxes(); //call 
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO === true) {
      //means player-O turn
      box.innerText = "O";
      box.style.color="green";
      turnO = false; //for next player X turn
    } else {
      box.innerText = "X";  //means player-X turn
      box.style.color="red";
      turnO = true;
    } 
    box.disabled = true;
    count++;

   let isWinner= checkWinner();

   //condition of draw
   if (count===9 && !isWinner){ 
        console.log("Game Draw!");
        gameDraw();
        return true;
   }
  });
});
const gameDraw=()=>{
    msg.innerText='Game was a DRAW!';
    msgContainer.classList.remove("hide");
    disableBoxes();
};

 const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
 };

 const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""; //empty box
 }
};
const showWinner=(player)=>{
    winner.innerText= `Player ${player}`;
    player === "O" ? winner.style.color = "green" : winner.style.color = "red";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // ); 
    let pos1val=boxes[pattern[0]].innerText;
    let pos2val=boxes[pattern[1]].innerText;
    let pos3val=boxes[pattern[2]].innerText; //pattern position in boxes array

    if(pos1val != "" && pos2val !="" && pos3val != ""){ //3 positions shoudn't empty then check winning pattern or not
       if(pos1val===pos2val && pos2val===pos3val){ //winning condition
          console.log("winner is player-",pos1val);
          showWinner(pos1val);
          return true;
       }
    }
  }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
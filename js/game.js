


var player, current, activePlayer, count, inputScope, scoreScope =100  
var gaolScore = document.querySelector("#goal-score")
document.getElementById("btn-scoreScope").addEventListener("click", function(){
    inputScope = document.getElementById("scoreScope").value
    console.log(inputScope === null)
    if(inputScope !== null){
        scoreScope = inputScope
    }
    gaolScore.textContent= "Goal: "+scoreScope
    hide()
})

newGame()
document.querySelector("#roll_dice").addEventListener('click',  dice )
document.querySelector("#new-game").addEventListener('click',  newGame )
document.querySelector("#new-game2").addEventListener('click',  newGame )
document.querySelector("#hold").addEventListener('click',  hold )
document.querySelector("#game-btn").addEventListener('click', gamePage)
document.querySelector("#rule-btn").addEventListener('click', rulesPage)

function gamePage(){
    console.log('game')
    document.querySelector("#game").classList.remove("hidden")
    document.querySelector("#rules").classList.add("hidden")
}

function rulesPage(){
    console.log('rules')
    document.querySelector("#game").classList.add("hidden")
    document.querySelector("#rules").classList.remove("hidden")
}

function dice(){
    hide()
    var ra = Math.floor((Math.random() * 6) + 1)
    console.log(ra)
    document.getElementById("dice").src = "dice/dice-" + ra + ".svg"

    if(ra === 6){
        count++;
    }
    if(count == 2){
        alert("two 6 is rolled");
        player[activePlayer] = 0
        nextPlayer()
    }

    if(ra > 1){
        

        current += ra
        
        document.getElementById("current-" + activePlayer).textContent = current

        if(activePlayer === 1){
            diceOrHold();
        }

    }else if(ra === 1){
         
        alert("Roll 1, next player round");
        nextPlayer()
        
    }
      
    
}
function hold(){
    player[activePlayer] += current 
    if(player[0] >= scoreScope){
        alert("player 1 won")
        newGame()
    }else if(player[1] >= scoreScope){
        alert("player 2 won")
        newGame()
    }else{
    nextPlayer()
    }
}
function update (){
    if(activePlayer == 0){
        document.getElementById("active-0").style.display = "inline"
        document.getElementById("active-1").style.display = "none"
    }else if(activePlayer == 1){
        document.getElementById("active-0").style.display = "none"
        document.getElementById("active-1").style.display = "inline" 
        
    }
    document.querySelector("#score-0").textContent = player[0]
    document.querySelector("#score-1").textContent = player[1]
    document.querySelector("#current-0").textContent = 0
    document.querySelector("#current-1").textContent = 0
}
function newGame(){
    player = [0,0]
    current = 0
    activePlayer = 0
    console.log("player scores =" + player)
    console.log("current =" + current)
    console.log("activePlayer =" + activePlayer)
    update()
    document.getElementById("scoreScope").style.display = "inline"
    document.getElementById("btn-scoreScope").style.display = "inline"
    gaolScore.textContent= "Goal: "+scoreScope

}
function nextPlayer(){
    current = 0
    activePlayer = (activePlayer+ 1) % 2
    count = 0
    console.log("activeplayer = " + activePlayer)
    console.log("player ="+player[activePlayer])
    update()
    if(activePlayer === 1){
        robot()
    }
}
function hide(){
    document.getElementById("scoreScope").style.display = "none"
    document.getElementById("btn-scoreScope").style.display = "none"
    gaolScore.classList.remove("hidden")
}

async function robot(){
    try{

        await setTimeout(() => dice(), 3000);
    }catch(err){
        console.lop(err)

    }
}

async function diceOrHold(){
    try{

        await setTimeout( () => {
            const ra = Math.round(Math.random() * 1)
            if(ra == 0){
                dice()
            }else if(ra == 1) {
                hold()
            }
        }, 3300);
    }catch(err){
        console.log(err)
    }
}
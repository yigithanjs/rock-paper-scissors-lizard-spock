/* RULES */
const openRulesButton = document.querySelector("#openRules")
const closeRulesButton = document.querySelector("#closeIcon")
const rulesContainer = document.querySelector("#rulesContainer")

openRulesButton.addEventListener("click", () => {
    rulesContainer.style.top = "50%"
})

closeRulesButton.addEventListener("click", () => {
    rulesContainer.style.top = "-50%"
})


// Defining each of the buttons (rpsls)
const rock = document.querySelector("#rock")
const paper = document.querySelector("#paper")
const scissors = document.querySelector("#scissors")
const lizard = document.querySelector("#lizard")
const spock = document.querySelector("#spock")


/* IN GAME */ 
const options = ["Rock", "Paper", "Scissors", "Lizard", "Spock"]
let userSelected = undefined
let houseSelected = undefined
let houseNum = undefined

// Options in html form
const optionHtml = ['<span class="rock"><img src="/images/icon-rock.svg" alt="Rock"></span>', '<span class="paper"><img src="/images/icon-paper.svg" alt="paper"></span>', '<span class="scissors"><img src="/images/icon-scissors.svg" alt="Scissors"></span>', '<span class="lizard"><img src="/images/icon-lizard.svg" alt="Lizard"></span>', '<span class="spock"><img src="/images/icon-spock.svg" alt="Spock" class="spockImg"></span>']

// Defining variable about main menu and inGame 
const mainMenu = document.querySelector("#rpsls")
const inGameDiv = document.querySelector("#inGame")
const userSelectionParam = document.querySelector("#userSelection")
const houseSelectionParam = document.querySelector("#houseSelection")
const scoreDisplay = document.querySelector("#score")

// Resulting page variables
const resultContainer = document.querySelector("#result")
const playAgainButton = document.querySelector("#playAgain")
const winOrLose = document.querySelector("#resultInfo")
const you = document.querySelector("#you")
const house = document.querySelector("#house")

rock.addEventListener("click", () => weAreIn(0))

paper.addEventListener("click", () => weAreIn(1))

scissors.addEventListener("click", () => weAreIn(2))

lizard.addEventListener("click", () => weAreIn(3))

spock.addEventListener("click", () => weAreIn(4))

// defining delay function to make sure house doesnt respond immediately
const delay = ms => new Promise(res => setTimeout(res, ms));

// function to call after user make decision
const weAreIn = async (num) => {
    userSelected = options[num] // get the selected option to check who win (later)

    /* display the selected option */
    userSelectionParam.innerHTML = optionHtml[num]
    mainMenu.style.display = "none"
    inGameDiv.style.display = "flex"

    /* Call the house */
    houseResponse()

    await delay(1500)
    /* display the selection of house */
    houseSelectionParam.innerHTML = optionHtml[houseNum]

    await delay(500)
    resultContainer.style.display = "flex"

    findTheWinner(num, houseNum)
    winOrLose.innerHTML = userWon
    scoreDisplay.innerHTML = score

     // Save score to localStorage
     localStorage.setItem('score', score)
}

const houseResponse = () => {
    houseNum = Math.floor(Math.random() * 5)
    houseSelected = options[houseNum]
}

// Win Situations
const outcomes = {
    Rock: ["Scissors", "Lizard"],
    Paper: ["Rock", "Spock"],
    Scissors: ["Paper", "Lizard"],
    Lizard: ["Spock", "Paper"],
    Spock: ["Rock", "Scissors"]
  }
  
let userWon = undefined
let score = parseInt(localStorage.getItem('score')) || 0 // Retrieve score from localStorage or initialize to 0

const findTheWinner = (usersPick, housesPick) => {
   usersPick = options[usersPick]
   housesPick = options[housesPick]
   
   if(usersPick === housesPick){
    userWon = "DRAW"
   } else if(outcomes[usersPick].includes(housesPick)){
        userWon = "YOU WIN"
        score++
        winnerEffect(you)
    } else {
        userWon = "YOU LOSE"
        score--
        winnerEffect(house)
   }
}

playAgainButton.addEventListener("click", () => {
    userSelected = undefined
    houseSelected = undefined
    userWon = undefined
    userSelectionParam.innerHTML = ""
    houseSelectionParam.innerHTML = '<button class="waiting">House is making a choice...</button>'

    mainMenu.style.display = "flex"
    inGameDiv.style.display = "none"
    resultContainer.style.display = "none"
    you.style.color = "white"
    house.style.color = "white"
})

winnerEffect = (winnerDiv) => {
    winnerDiv.style.color = "orange"
}

// Initialize score display on page load
scoreDisplay.innerHTML = score
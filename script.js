const X_CLASS = 'x';
const O_CLASS = 'o';
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessage = document.querySelector('#winningMessage')
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  ]
const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
let circleTurn;
const btn = document.querySelector('#btn');

startGame()

 btn.addEventListener('click', startGame)
 

function startGame(){
  circleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
  })
  setBoardHoverClass()
  winningMessage.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS :X_CLASS ;
  placeMark(cell, currentClass)
  if (checkWin(currentClass)){
    endGame(false);
  }else if(isDraw()) {
    endGame(true)
  }else {
  swapTurn()
  setBoardHoverClass()
  }
  
}
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = 'Draw !';
  }else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} win`
  }
   winningMessage.classList.add('show')
}

function isDraw () {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  })
}

function placeMark(cell, currentClass){
  cell.classList.add(currentClass);
}

function swapTurn(){
  circleTurn = !circleTurn;
}

function setBoardHoverClass(){
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  if(circleTurn){
    board.classList.add(O_CLASS)
  }else{
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass)
    })
  })
}







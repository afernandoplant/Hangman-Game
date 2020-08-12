import Hangman from './hangman'
import getPuzzle from './requests'

let messages=[]

const renderMessage = function(game) {
    if (game.status === 'playing') {

        if (messages[0] !== undefined ) {
            messages.forEach((msg) => {
                messageFeed.textContent = `\n${msg}  (${game.guesses} guesses remaining)`
            })
        }

    } else if (game.status === 'finished') {
        messageFeed.textContent=`congratulations! you guessed the word!`
    } else if (game.status === 'failed') {
        messageFeed.textContent=`nice try! the word was: ${game.word.join('')}`
    }
    
}


const puzzleSpan=document.querySelector('#puzzleSpan')

const guessSpan=document.querySelector('#guessSpan')

const messageFeed=document.querySelector('#messageFeed')

let game1


const updateDisplay = function () {
    puzzleSpan.innerHTML = ""
    guessSpan.textContent = `New game (${game1.guesses} guesses remaining)`
    game1.puzzle.split('').forEach((letter) => {
        let letterEl = document.createElement('span')
        letterEl.textContent=`${letter}`
        letterEl.setAttribute('class' , 'puzzle')
        puzzleSpan.appendChild(letterEl)
    })
}



window.addEventListener('keypress', function (e) {
    const guess=String.fromCharCode(e.charCode)
    messages.push(game1.guess(guess))
    updateDisplay()
    game1.status
    renderMessage(game1)
    
})

const startGame = async () => {
    const puzzleString = await getPuzzle(1)
    game1= new Hangman(puzzleString)
    updateDisplay()
    renderMessage(game1)
}

document.querySelector('#reset').addEventListener('click', () => {
    messages = []
    messages.push('New Game ')
    
    startGame()
})

startGame()
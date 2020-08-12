class Hangman {
    constructor(word) {
        this.word = word.toLowerCase().split('')
        // this.length = word.replace(/\s+/g, '').length
        this.guesses = word.replace(/\s+/g, '').length
        this.guessedLetters = []
        this.wordMasked = []
        this.status = 'playing'
    }

    get puzzle() {
        let masked = []
        const isGuessed = (letter) => this.guessedLetters.includes(letter.toLowerCase())
        const isCorrect = (letter) => this.word.includes(letter)
        const include = (letter) => isGuessed(letter) && isCorrect(letter)
        const isSpace = (letter) => letter === ' '
        
        this.word.forEach((letter) => {
            include(letter) || isSpace(letter) ? masked += letter : masked +="*"
        })
    
        this.wordMasked=masked.split('')
        return masked
    }

    guess(letter) {
        let message =''
    
        if (this.status !== 'playing') {
            return
        }
    
        if (!this.guessedLetters.includes(letter)) {
            if (this.word.includes(letter)) {
                this.guessedLetters.push(letter)
                message = `${letter} is correct!`
            } else {
                this.guessedLetters.push(letter)
                this.guesses --
                message = `${letter} is not a letter in the answer.`
            }
        } else {
            message = (`Already guessed ${letter}!`)
        }
        
         
        return message
    }

    get status() {
        if (!this.wordMasked.includes('*')) {
            this._status = 'finished'
        } else if (this.guesses === 0 && this.wordMasked !== this.word) {
            this._status = 'failed'
        } else {
            this._status = 'playing'
        }

        return this._status
    }

    set status(state) {
        this._status = state
    }
}

export {Hangman as default}










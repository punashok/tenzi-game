import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti";

function App() {

  const [diceRolled, setDiceRolled] = React.useState(1)
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  
  

  
  React.useEffect(function () {
    const allHeld = diceNumbers.every(die => die.isHeld)
    const firstValue = diceNumbers[0].value
    const allSame = diceNumbers.every(dice=>dice.value===firstValue)
    if (allHeld && allSame) {
      setTenzies(true)
    }
    

  },diceNumbers)

  function generateNewDie() {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    return {
      id:nanoid(),
      value: randomNumber,
      isHeld: false
    }
  }

  function allNewDice() {

    let randomNumbersArray = []
    for (let i = 0; i < 10; i++){
      
      randomNumbersArray.push(generateNewDie())
    }
    return randomNumbersArray;
  }

  function rollDice() {
    
    if (tenzies) {
      setTenzies(false)
      setDiceNumbers(allNewDice())
      setDiceRolled(1)
    }
    else {
      setDiceRolled(prevNum=>(prevNum+1))
      setDiceNumbers(oldDice =>
        oldDice.map(
          die => die.isHeld ?
            die :
            generateNewDie()
          )
      )
    }

    
  }
  function holdDice(id) {
    setDiceNumbers(prevDice => {
      return prevDice.map(die => {
        if (die.id === id) {
          return {...die,isHeld:!die.isHeld}
        }
        else {
          return die;
        }
      })
    })
  }

  const diceElements = diceNumbers.map(die => <Die holdDice={holdDice} die={die} key={die.id} />)
  
  //const { width, height } = useWindowSize()

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
      Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
          {diceElements}
      </div>
      <button
        onClick={rollDice}
        className="roll-dice"
      >
        {tenzies?"New Game":"Roll"}
      </button>
      <p>
        Dice Rolled: {diceRolled==1?diceRolled+" time ": diceRolled+" times"}
      </p> 
      {
        tenzies &&
      
        <Confetti />
      }
    </main>
  );
}

export default App;

import React from "react";
import { useState, useEffect } from "react";

import { nanoid } from "nanoid"; // for id creation

import Dice from "./components/Dice"; // component for dice
import Counter from "./components/Counter";

import "./App.css"; // styles

type Dice = {
  value: number;
  isHeld: boolean;
  id: string;
};
export default function App() {
  // creating dices
  const allNewDice = (): Dice[] => {
    let outputArr: Dice[] = [];
    while (outputArr.length <= 9) {
      let outObj = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };

      outputArr.push(outObj);
    }
    return outputArr;
  };

  //handle dice creation, setting
  const [dice, setDice] = useState<Dice[]>(allNewDice());

  //handle game loop

  const [tenzies, setTenizes] = useState<boolean>(false);

  // handle score

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const allHeld = dice.every((el) => el.isHeld); //check if all dices are held
    const firstElement = dice[0]?.value;
    const sameVal = dice.every((el) => el.value === firstElement); //check if all have same vals

    if (allHeld && sameVal) {
      setTenizes(true);
      console.log("win win!");
    }
  }, [dice]);

  //lets roll only not isHeld dices
  function rollDice() {
    if (!tenzies) {
      setScore((prev) => prev + 1);
      setDice((prev) =>
        prev.map((el) =>
          !el.isHeld
            ? {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              }
            : el
        )
      );
    } else {
      setTenizes(false);
      setDice(allNewDice);
      setScore((prev) => 0);
    }
  }

  // handle hold dice
  function holdDice(id: string) {
    setDice((prev) =>
      prev.map((el) => (el.id === id ? { ...el, isHeld: true } : el))
    );
  }

  //pass props, render element
  const diceElements = dice.map((el) => (
    <Dice
      value={el.value}
      id={el.id}
      isHeld={el.isHeld}
      key={el.id}
      holdDice={holdDice}
    />
  ));
  // conditional ender btn text

  return (
    <main>
      {tenzies && <h3>You Win!</h3>}
      <div className="diceWrapper">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies ? (
        <h3 className="score">Your score : {score}</h3>
      ) : (
        <Counter score={score} />
      )}
    </main>
  );
}

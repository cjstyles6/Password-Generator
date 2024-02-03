/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaPlus, FaMinus, FaClipboard } from "react-icons/fa6";
import {
  upperCaseLetters,
  lowerCaseLetters,
  numbers,
  symbols,
} from "../utility";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("Tstlm");
  const [counter, setCounter] = useState(5);
  const [isUpperCase, setIsUpperCase] = useState(true);
  const [isLowerCase, setIsLowerCase] = useState(true);
  const [isNumbers, setNumbers] = useState(false);
  const [isSymbols, setSymbols] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // State for the popup


  const generatePassword = (e) => {
    e.preventDefault();
    let result = "";

    for (let i = 0; i < counter; i++) {
      result += getRandom();
    }

    setPassword(result);
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(password).then(() => {
      console.log('copied');
      return <Model/>
    });
  };

  const getRandom = () => {
    const selectedOptions = [
      isUpperCase && "upperCase",
      isLowerCase && "lowerCase",
      isNumbers && "numbers",
      isSymbols && "symbols",
    ].filter(Boolean);

    let selectRandomOption = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];

    switch (selectRandomOption) {
      case "upperCase":
        return upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
      case "lowerCase":
        return lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
      case "numbers":
        return numbers[Math.floor(Math.random() * numbers.length)];
      case "symbols":
        return symbols[Math.floor(Math.random() * symbols.length)];
      default:
        return "";
    }
  };

  return (
    <section className="flex h-screen w-full items-center justify-center bg-blue-400">
      <div className="w-[80%] max-w-[400px] rounded-sm bg-white px-2 py-3 text-center ">
        <h1 className="mb-3 text-3xl font-bold tracking-wider">
          Password Generator
        </h1>

        <h3 className="mx-auto flex w-full items-center justify-between px-[1.5em] text-center text-xl font-bold tracking-wider text-blue-950">
          {password}{" "}
          {password !== "" && <FaClipboard className="cursor-pointer" onClick={copyToClipBoard} />}
        </h3>
        {isCopied && (
          <div className="absolute top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-md">
            Copied to clipboard!
          </div>
        )}


        <form action="">
          <div className="input-form">
            <label htmlFor="uppercase">UpperCase</label>
            <input
              type="checkbox"
              name="uppercase"
              id="uppercase"
              checked={isUpperCase}
              onChange={(e) => setIsUpperCase(!isUpperCase)}
            />
          </div>

          <div className="input-form">
            <label htmlFor="lowercase">LowerCase</label>
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              checked={isLowerCase}
              onChange={(e) => setIsLowerCase(!isLowerCase)}
            />
          </div>

          <div className="input-form">
            <label htmlFor="numbers">Numbers</label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              checked={isNumbers}
              onChange={(e) => setNumbers(!isNumbers)}
            />
          </div>

          <div className="input-form">
            <label htmlFor="symbols">Symbols</label>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              checked={isSymbols}
              onChange={(e) => setSymbols(!isSymbols)}
            />
          </div>
        </form>

        <div className="rounded-sm bg-blue-100 py-2">
          <p className="text-xl font-bold">Password Length</p>

          <div className="mt-2 flex items-center justify-center">
            <button
              className="btn"
              onClick={() =>
                counter > 5 && setCounter((prevCounter) => prevCounter - 1)
              }
            >
              <FaMinus className="icon" />
            </button>
            <span className="text-2xl font-bold">{counter}</span>
            <button
              className="btn"
              onClick={() =>
                counter < 20 && setCounter((prevCounter) => prevCounter + 1)
              }
            >
              <FaPlus className="icon" />
            </button>
          </div>
        </div>

        <button className="generate-btn" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </section>
  );
};

export default PasswordGenerator;

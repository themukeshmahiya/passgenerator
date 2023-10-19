import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numallow, setNumAllow] = useState(false);
  const [charallow, setCharAllow] = useState(false);
  const [pass, setPass] = useState("Passwords Here");
  const [COPY, setCopy] = useState("COPY");

  const passWordsGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallow) str += " 012345678901234567890123456789";
    if (charallow) str += "!@#$%^&*()";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPass(pass);
    setCopy("COPY");
  }, [length, numallow, charallow, setPass]);

  useEffect(() => {
    passWordsGenerator();
  }, [length, numallow, charallow, passWordsGenerator]);

  const passRef = useRef(null);
  const copypasswordtoclipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard
      .writeText(pass)
      .then(() => {
        setCopy("DONE");
        console.log("Text copied to clipboard successfully.");
      })
      .catch((error) => {
        console.log("Unable to copy text to clipboard");
      });
  }, [pass]);

  return (
    <div id="first" className="rounde-2xl p-4">
      <h1
        id="h1"
        className="text-4xl font-bold text-centre mb-4 rounded-2xl p-4"
      >
        PassWord Generator
      </h1>

      <div
        id="mid"
        className="flex shadow rounded-2xl overflow-hidden mb-4 p-4"
      >
        <input
          id="input"
          type="text"
          value={pass}
          className="outline-none font-medium rounded-l-2xl w-full py-3 px-2"
          placeholder="pass"
          readOnly
          ref={passRef}
        />
        <button
          id="copy"
          className="outline-none font-mono rounded-r-2xl bg-orange-600 text-black px-3 py-0.5 shrink-0"
          onClick={copypasswordtoclipboard}
        >
          {COPY}
        </button>
      </div>
      <div id="low" className="flex text-sm gap-x-4 rounded-2xl p-2 ">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={25}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="label">Length({length})</label>
        </div>
        <div className="flex items-centre gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numallow}
            id="numberInput"
            onChange={() => {
              setNumAllow((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="label">
            NumOn
          </label>
        </div>
        <div className="flex items-centre gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charallow}
            id="charInput"
            onChange={() => {
              setCharAllow((prev) => !prev);
            }}
          />
          <label htmlFor="charInput" className="label">
            CharOn
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;

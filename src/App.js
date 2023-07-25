import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/usePasswordGenerator";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase letters", state: false, type: "UPPERCASE" },
    { title: "Include Lowercase letters", state: false, type: "LOWERCASE" },
    { title: "Include Numbers", state: false, type: "NUMBER" },
    { title: "Include Symbols", state: false, type: "SYMBOLS" }
  ]);

  const [copy, setCopy] = useState(false);

  const { password, error, generatePassword } = usePasswordGenerator();

  const handleOnChecked = (idx) => {
    const updateCheckBoxState = [...checkboxData];
    updateCheckBoxState[idx].state = !updateCheckBoxState[idx].state;
    setCheckboxData(updateCheckBoxState);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopy(true);
    }

    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  return (
    <main>
      <div className="container">
        <div className="header">
          <div className="title">{password ? password : error}</div>
          <button onClick={handleCopy}>{copy ? "copied" : "copy"}</button>
        </div>
        {/**password Length */}
        <div className="passwordLen">
          <span>
            <label>Password Length</label>
            <label>{length}</label>
          </span>

          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        {/**checkboxes */}
        <div className="checkboxes">
          {checkboxData.map((checkbox, idx) => {
            return (
              <div key={idx}>
                <input
                  id={checkbox.title}
                  type="checkbox"
                  checked={checkbox.state}
                  onChange={() => handleOnChecked(idx)}
                />
                <label for={checkbox.title}>{checkbox.title}</label>
              </div>
            );
          })}
        </div>

        {/** Generate Button */}
        <button
          className="generatePasswordBtn"
          onClick={() => generatePassword(checkboxData, length)}
        >
          Generate Password
        </button>
      </div>
    </main>
  );
}

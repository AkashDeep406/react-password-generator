import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = (checkboxData, length) => {
    let charset = "";
    let generatedPassword = "";

    const selectedOptions = checkboxData.filter((checkbox) => checkbox.state);

    if (selectedOptions.length <= 0) {
      setError("select at lest on option. ");
      setPassword("");
      return;
    }

    selectedOptions.forEach((option) => {
      switch (option.type) {
        case "UPPERCASE":
          charset += "ABCDEFGHIJKLNMOPQRSTUVWXYZ";
          break;
        case "LOWERCASE":
          charset += "abcdefghijklnmopqrstuvwxyz";
          break;
        case "NUMBER":
          charset += "0123456789";
          break;
        case "SYMBOLS":
          charset += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setError("");
  };

  return { password, error, generatePassword };
};

export default usePasswordGenerator;

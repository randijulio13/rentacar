import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Template from "../../components/Template";

export default function index() {
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkMode = () => {
    setDarkMode((darkMode) => !darkMode);
  };
  return (
    <Template>
      <button onClick={handleDarkMode} className="text-3xl">
        <div className="duration-300 ease-out active:-rotate-180">
          {darkMode ? <MdDarkMode /> : <MdLightMode />}
        </div>
      </button>
    </Template>
  );
}

index.admin = true;

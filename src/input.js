import React, { useState } from "react";

const Input = () => {
  const [val, setVal] = useState("");
  return (
    <div className="bg-blue-200 h-screen w-screen flex justify-center items-center">
      <input
        onChange={(e) => {
          setVal(e.target.value);
        }}
        type="number"
        value={val}
      ></input>
    </div>
  );
};

export default Input;

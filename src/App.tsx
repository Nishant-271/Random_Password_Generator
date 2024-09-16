import { useState, useCallback, useEffect, useRef } from "react";

// whenever i have to provide some functionality
// we should use useState hooks for that

function App() {
  const [length, setLength] = useState(8);
  const [numallow, setNumallow] = useState(false);
  const [charallow, setCharallow] = useState(false);
  const [password, setPassword] = useState("");

  // useref hook
  const passref = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallow) str += "0123456789";
    if (charallow) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

    for (let i = 1; i <= length; i++) {
      let ch = Math.floor(Math.random() * str.length);
      pass += str.charAt(ch);
    }
    setPassword(pass);
  }, [length, numallow, charallow, setPassword]);

  const copyPassToClip = useCallback(() => {
    //  using window obj to copy text to clipboard
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numallow, charallow, passwordgenerator]);

  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
      text-orange-500 bg-gray-800"
      >
        <h1 className="text-white text-center">PASSWORD GENERATOR</h1>
        <div className="flex rounded-lg shadow-md mb-4 mt-2 overflow-hidden">
          <input
            type="text"
            value={password}
            className="
          outline-none w-full px-3 py-1      "
            placeholder="Password"
            readOnly
            ref={passref}
          />
          <button
            onClick={copyPassToClip}
            className="outline-none text-white px-3 py-0.5 shrink-0  bg-blue-900"
          >
            COPY
          </button>
        </div>

        <div className="flex text-sm gap-x-10 ">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-20"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-orange-90">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numallow}
              id="numinput"
              onChange={() => {
                setNumallow((prev) => !prev);
              }}
            />
            <label className="text-white" htmlFor="numinput">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallow}
              id="chinput"
              onChange={() => {
                setCharallow((prev) => !prev);
              }}
            />
            <label className="text-white" htmlFor="chinput">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

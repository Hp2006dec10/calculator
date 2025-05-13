import { useEffect, useState } from "react";

function App() {
  const [current, changeCurrent] = useState("");
  const [firstNum, setFirstNum] = useState("null");
  const [opcode, setOpCode] = useState(-1);
  const [secondNum, setSecondNum] = useState("null");
  const [expression, changeExpression] = useState("");
  const [dotDisabled, disableDot] = useState(false);
  const [opcodeSet, disableOp] = useState(false);
  const [equalDisabled, disableEqual] = useState(false);
  const [disabledClear, disableClear] = useState(false);
  const [disabledInput, disableInput] = useState(false);
  
  const reset = () => {
    changeExpression("");
    disableDot(false);
    disableEqual(false);
    disableOp(false);
    disableClear(false);
    setOpCode(-1);
    setFirstNum("null");
    setSecondNum("null");
    disableInput(false);
  }

  const handleNumberClick = (value) => {
    if (current == "0" && value == 0);
    else if (!current && value == ".") changeCurrent(str => str + "0.");
    else changeCurrent(str => str + value);
    if (value == ".") disableDot(true);
    if (opcode != -1) disableOp(true);
  }

  const handleClear = () => {
    if (current[current.length - 1] == "." || current[current.length - 2] == ".") {
      changeCurrent(str => str.slice(0, -2));
      disableDot(false);
    }
    else changeCurrent(str => str.slice(0, -1));

  }

  const handleClearAll = () => {
    if (current && !equalDisabled) {
      changeCurrent("");
      return;
    }
    else if (current && equalDisabled) changeCurrent("");
    reset();
  }
  const handleAdd = () => {
    if (!isNaN(parseInt(current)) || current == "") {
      if (expression) changeExpression(str => str.slice(0, -1) + "+");
      else {
      if (/^[0-9]+\.[0-9]+$/.test(current)){ 
        setFirstNum(() => {
          changeExpression(parseFloat(current) + "+");
          changeCurrent("");
          return parseFloat(current) || 0;
        });
      }
      else 
        setFirstNum(() => {
          changeExpression((parseInt(current) || "0") + "+");
          changeCurrent("");
          return parseInt(current) || 0;
        });
      }
      setOpCode(0);
    };   
  } 

  const handleSub = () => {
    if (!isNaN(parseInt(current)) || current == "") {
      if (expression) {
        changeExpression(str => str.slice(0, -1) + "-");
        setOpCode(1);
      }
      else {
        if (current == "") changeCurrent("-");
        else {
          if (/^[0-9]+\.[0-9]+$/.test(current)){ 
            setFirstNum(() => {
              changeExpression(parseFloat(current) + "-");
              changeCurrent("");
              return parseFloat(current) || 0;
            });
          }
          else 
            setFirstNum(() => {
              changeExpression((parseInt(current) || "0") + "-");
              changeCurrent("");
              return parseInt(current) || 0;
            });
          setOpCode(1);
        }
      }
    };   
  } 

  const handleMultiply = () => {
    if (!isNaN(parseInt(current)) || current == "") {
      if (expression) changeExpression(str => str.slice(0, -1) + "*");
      else {
      if (/^[0-9]+\.[0-9]+$/.test(current)){ 
        setFirstNum(() => {
          changeExpression(parseFloat(current) + "*");
          changeCurrent("");
          return parseFloat(current) || 0;
        });
      }
      else 
        setFirstNum(() => {
          changeExpression((parseInt(current) || "0") + "*");
          changeCurrent("");
          return parseInt(current) || 0;
        });
      }
      setOpCode(2);
    };   
  } 

  const handleDiv = () => {
    if (!isNaN(parseInt(current)) || current == "") {
      if (expression) changeExpression(str => str.slice(0, -1) + "/");
      else {
      if (/^[0-9]+\.[0-9]+$/.test(current)){ 
        setFirstNum(() => {
          changeExpression(parseFloat(current) + "/");
          changeCurrent("");
          return parseFloat(current) || 0;
        });
      }
      else 
        setFirstNum(() => {
          changeExpression((parseInt(current) || "0") + "/");
          changeCurrent("");
          return parseInt(current) || 0;
        });
      }
      setOpCode(3);
    };  
  }

  const setExp = () => {
    if (expression == "") return;
    if (expression && current == "") {
      setSecondNum(Math.abs(firstNum));
      changeExpression(str => str + Math.abs(firstNum) + "=");
    }
    else{
      setSecondNum(()=> {
        if (/^[0-9]+\.[0-9]+$/.test(current)) setSecondNum(parseFloat(current));
        else setSecondNum(parseInt(current));
      });
      changeExpression(str => str + current + "=");
      changeCurrent("");
    }
    disableEqual(true);
    disableClear(true);
  }

  useEffect(()=>{
    if (!isNaN(firstNum) && !isNaN(secondNum) && opcode != -1){
      console.log(firstNum, secondNum);
      if (opcode == 0) changeCurrent(firstNum + secondNum);
      else if (opcode == 1) changeCurrent(firstNum - secondNum);
      else if (opcode == 2) changeCurrent(firstNum * secondNum);
      else if (opcode == 3 && secondNum != 0) changeCurrent(firstNum / secondNum);
      else changeCurrent("Undefined");
      disableInput(true);
    }
  },[firstNum, secondNum, opcode]);

  return(
    <div className="h-screen w-screen flex items-center justify-evenly bg-[rgb(248,246,246)]">
      <div className="w-[100%] h-[100vh] md:h-500 md:w-300 box-border bg-white border-black border-[2.5px]">
        <div className="w-[100%] h-[40%] md:h-[35%]">
            <div className="h-[40%] w-[100%] text-[rgba(0,0,0,0.5)] text-[1.25rem] flex place-content-end p-[2.5%]">{expression}</div>
            <div className="h-[60%] w-[100%] px-[2%] flex">
              <div className="w-[25%] h-[100%] flex flex-col justify-evenly">
                <div className="w-[100%] h-[50%] flex justify-evenly items-center shadow-[inset_4px_4px_30px_rgba(129,7,7,0.15)] cursor-pointer select-none" onClick={() => handleClearAll()}>CE</div>
                <div className={`w-[100%] h-[50%] flex justify-evenly items-center shadow-[inset_4px_4px_30px_rgba(129,7,7,0.15)] cursor-pointer select-none ${disabledClear ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`} onClick={() => handleClear()}>C</div>
              </div>
              <div className="w-[75%] h-[100%] flex justify-end items-end text-4xl p-[5%] ">{current}</div>
            </div>
        </div>
        <div className="flex flex-wrap w-[100%] h-[60%] md:h-[65%] items-center justify-evenly py-[1%] text-3xl">
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("9")}>9</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("8")}>8</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("7")}>7</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(171,6,9,0.15)] cursor-pointer select-none ${opcodeSet ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleDiv()}>/</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("6")}>6</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("5")}>5</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("4")}>4</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(171,6,9,0.15)] cursor-pointer select-none ${opcodeSet ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleMultiply()}>*</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("3")}>3</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("2")}>2</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("1")}>1</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(171,6,9,0.15)] cursor-pointer select-none ${opcodeSet ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleSub()}>-</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${dotDisabled ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick(".")}>.</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(0,0,0,0.15)] cursor-pointer select-none ${disabledInput ? "pointer-events-none opacity-50 grayscale cursor-not-allowed" : ""}`} onClick={() => handleNumberClick("0")}>0</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center bg-[rgb(106,138,242)] shadow-[inset_4px_4px_15px_rgba(0,0,0,0.5)] cursor-pointer select-none ${equalDisabled ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`} onClick={() => setExp()}>=</div>
          <div className={`w-[22.5%] h-[22.5%] flex justify-center items-center shadow-[inset_5px_5px_25px_rgba(171,6,9,0.15)] cursor-pointer select-none ${opcodeSet ? "pointer-events-none opacity-50 grayscale cursor-not-allowed": ""}`} onClick={() => handleAdd()}>+</div>
        </div>
      </div>
    </div>
  )
}

export default App;

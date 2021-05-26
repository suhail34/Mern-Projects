import './App.css';
import { useState } from 'react';

function App() {

  let [expression, setExpression] = useState("0");
  let [oldExpression, setOldExpression] = useState("");
  let [prev, setPrev] = useState("ANS");

  let numerics = new Set("0123456789.()");
  let operators = new Set("+-/*%");

  let Buttons = [
    '(',
    ')',
    'X',
    'AC',
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '=',
    '+'
  ]

  let handleKeyUp = function (event) {
    console.log(event.key);
    if (event.key === "Backspace") {
      if (expression.length >= 1) {
        setExpression(expression.slice(0, -1));
      }
      MagicDeletion();
    }
    else if (numerics.has(event.key)) {
      NumExp(event.key);
    } else if (operators.has(event.key)) {
      OpExp(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
      EvaluateExpression();
    }
  }

  let MagicDeletion = function () {
    if (expression === '') {
      setOldExpression("");
      setExpression(oldExpression.slice(0, -1));
    }
  }

  let EvaluateExpression = function () {
    // eslint-disable-next-line no-eval
  try{
      let evaluation = (eval(expression));
    setOldExpression(expression + " =");
    setExpression(String(evaluation));
    setPrev("ANS");
    }
    catch{
      setExpression("ERROR");
    }
  }

  let NumExp = function (num) {
    if (prev === "ANS") {
      setOldExpression("ANS = " + expression);
      setExpression(num);
    } else {
      setExpression(expression + num);
    }
    setPrev("NUM");
  }

  let OpExp = function (operat) {
    if (prev !== "OP") {
      setExpression(expression + operat);
    } else {
      setExpression(expression.slice(0, -1) + operat);
    }
    setPrev("OP");
  }

  return (    
    <div className="App" tabIndex={0} onKeyUp={handleKeyUp} style={{
      width: "100%",
      height: "100vh",
      background: "#555555",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}> 
      
    <div style = {{
      padding : "10px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#333333"
    }}>  
      
      <h3 style={{textAlign: "center", fontFamily: "cursive", margin: "0px",color:"#ffffff" }}>This is my awesome calculator</h3>
      <h5 style={{textAlign: "center", fontFamily: "monospace", fontWeight: "bold", color: "#f140f8" }}>Created by Suhail</h5>

      <div style={{
        width: "400px",
        height: "100px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        padding: "20px",
        borderRadius: "10px",
        overflow: "hidden"
      }}>
        <h5>{oldExpression}</h5>
        <h2>{expression}</h2>
      </div>
    
      <div style={{
        width: "400px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "20px",
        margin: "20px",
        borderRadius: "10px",
        flexWrap: "wrap"
      }}>
        {Buttons.map(function (buttonEntity, index) {
          return (
            <button style={{
              width: "90px",
              padding: "5px",
              margin: "5px"
            }}
              onClick={
                function () {
                  if (buttonEntity === "X") {
                    if (expression.length >= 1) {
                      setExpression(expression.slice(0, -1));
                    }
                    MagicDeletion();
                  } else if (numerics.has(buttonEntity)) {
                    NumExp(buttonEntity);
                  } else if (operators.has(buttonEntity)) {
                    OpExp(buttonEntity);
                  } else if (buttonEntity === "=" || buttonEntity === "Enter") {
                    EvaluateExpression();
                  } else if (buttonEntity === "AC") {
                    setExpression(" ");
                    setOldExpression(' ');
                  }
                }
              }
            >
              {buttonEntity}
            </button>
          )
        })}
      </div>
      </div>
    </div>
  );
}

export default App;

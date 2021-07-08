import React from 'react';
// import ReactDOM from 'react-dom';
import './App.css';

const KEYS = {
    controls : {
      "SHIFT" : "",
      "ALPHA" : "",
      "REPLAY" : "REPLAY",
      "MODE_SETUP" : "",
      "ON" : ""
    },
    functions: {
      "cal" : "CALC",
      "fun" : "F",
      "emptyKey1" : "",
      "emptyKey2" : "",
      "xP-1" : "X^-1",
      "logx" : "Log[]",
      "devision" : "-/-",
      "root" : "_/''",
      "power" : "x^2",
      "powerX" : "x^x",
      "log" : "log",
      "In" : "In",
      "higphen" : "(-)",
      "comma" : ".,,,",
      "hyp" : "hyp",
      "sin" : "sin",
      "cos" : "cos",
      "tan" : "tan",
      "RCL" : "RCL",
      "EMG" : "ENG",
      "left_bracket" : "(",
      "right_bracket" : ")",
      "S-D" : "S<=>D",
      "M+" : "M+" 
    },
    numbers : {
      "seven" : '7',
      "eight" : '8',
      "nine" : '9',
      "four" : '4',
      "five" : '5',
      "six" : '6',
      "one" : '1',
      "two" : '2',
      "three" : '3',
      "zero" : '0'
    },
    operators : {
      "divide" : '/',
      "multiply" : '*',    
      "subtract" : '-',
      "add" : '+'
    },
    special_ops : {
      "decimal" : '.',
      "tenx": 'x10',
      "ans": "Ans",
      "equals" : '='    
    },
    erase : {
      "delete" : "DEL",
      "clear" : 'AC'    
    }
  }
  
  const getKeys = (ob) => {
    return Object.keys(ob).map(key => ob[key]);
  }
  
  const CONTROLS = getKeys(KEYS.controls);
  const functions = getKeys(KEYS.functions);
  const OPERATORS = getKeys(KEYS.operators);
  const NUMBERS = getKeys(KEYS.numbers);
  const SPECIAL_KEYS = getKeys(KEYS.special_ops);
  const ERASE = getKeys(KEYS.erase);
  
  //Component to display the inputs and result
  function Display({value}){
    return (
      <div id="display">
        <p id="display_input">{value}</p>
      </div>
     )
  }
  
  //Component to render all the buttons
  function Numpad({handleClick}){  
    const renderKeys = (ob) => {
      const arr = Object.keys(ob);
      return arr.map((key) => <button id={key} onClick={handleClick}><span className="btnText">{ob[key]}</span></button>)
    };         
    
    return <div id="numpad">
      <div className="controls">{renderKeys(KEYS.controls)}</div>
      <div className="mathfunctions">{renderKeys(KEYS.functions)}</div>
      <div className="lowerPad">
        <div className="numbers">{renderKeys(KEYS.numbers)}</div> 
        <div className="rightPad">
          <div className="erase">{renderKeys(KEYS.erase)}</div>
          <div className="operators">{renderKeys(KEYS.operators)}</div>
        </div>
        <div className="specialKeys">{renderKeys(KEYS.special_ops)}</div>
      </div>
    </div>
  }
  
  //Parent component composing the Display and Numpad component and logic for calc
  function Calc(){
    const [equation, setEquation] = React.useState([]);
    const [output, setOutput] = React.useState([]);
    
    React.useEffect(() => {
      let eq = [...equation].join('');
      if(eq.length >= 15) {
        // console.log(eq);
        eq = eq.split('').reverse().slice(0, 15).reverse().join('');
        setOutput(eq);
        // console.log(eq);      
      }
      else setOutput(equation);
    }, [equation])
    
    let lastItem = equation[equation.length - 1] || [];
    let lastChar = lastItem[lastItem.length - 1] || "";
    
    //Methods to handle the output 
    const handleOutput = {
      eval() {
        if(OPERATORS.indexOf(lastItem) !== -1 || lastChar === '.') return [...equation];
  
        let eq = [...equation];
  
        const getOpsIndex = (e) => {
          let arr = [];
  
          OPERATORS.map(o => { 
            let localArr = [];
  
            let index = e.indexOf(o)
  
            while (index != -1){
              localArr.push(index);
              index = e.indexOf(o, index + 1);
            }
            arr.push(localArr);
          });
  
          return arr;
        };
  
        let opsIndex = getOpsIndex(eq);
  
        const toNum = (input) => {
          return typeof input === 'string' ? Number(input) : input;
        }
  
        opsIndex.map((_, i)=>{
          opsIndex[i].map((index) => {
              let sol = 0;
              switch (i){
                case 0:
                  sol = toNum(eq[index - 1]) / toNum(eq[index + 1]);
                  eq.splice(index - 1, 3, sol)
                  break;             
                case 1:
                  sol = toNum(eq[index - 1]) * toNum(eq[index + 1])
                  eq.splice(index - 1, 3, sol)
                  break;              
                case 2:
                  sol = toNum(eq[index - 1]) - toNum(eq[index + 1])
                  eq.splice(index - 1, 3, sol)
                  break;              
                case 3: 
                  sol = toNum(eq[index - 1]) + toNum(eq[index + 1])
                  eq.splice(index - 1, 3, sol)
                  break;
            }
            opsIndex = getOpsIndex(eq);
          })
        })
        
        return [eq[0]];
      },
      ac() {
        return [];
      },
      del() {
        // console.log("LastItem : ", equation, lastItem, typeof lastItem, typeof equation);
        if(lastItem && lastItem.length === 1) return [equation.slice(0, equation.length - 1)];
        else if (lastItem && lastItem.length > 1) return [...equation.slice(0, equation.length - 1), lastItem.slice(0, lastItem.length - 1)];
        else return [];
      }
    }
    
    //Methods to handle the input
    const handleInput = {
      op(input) {
        const lastSecondItem = equation[equation.length - 2];
        OPERATORS.indexOf(lastItem) !== -1 && OPERATORS.indexOf(lastSecondItem) === -1 && input === '-' ? setEquation([...equation, input]) : OPERATORS.indexOf(lastSecondItem) !== -1 ? setEquation([...equation.slice(0, equation.length - 2), input]) : setEquation([...equation]);
  
        if(lastItem && OPERATORS.indexOf(lastItem) === -1 && lastChar !== '.') setEquation([...equation, input]) 
      },
      num(input) {
        if(!lastItem) setEquation([input]);
        else if(input === '0' && lastItem === '0') setEquation([...equation]);
        else if(OPERATORS.indexOf(lastItem) !== -1) {
          OPERATORS.indexOf(equation[equation.length - 2]) !== -1 ? setEquation([...equation.slice(0, equation.length - 1), lastItem + input]) : setEquation([...equation, input]);
        }
        else if(equation.length > 1 && equation.length % 2 === 1) setEquation([...equation.slice(0, equation.length - 1), lastItem + input])
        else setEquation([lastItem + input])
      },
      specialKey(input) {
        if(input === '=') setEquation(handleOutput.eval());
        else if(lastItem && OPERATORS.indexOf(lastItem) === -1 && lastItem.indexOf('.') === -1) setEquation([...equation.slice(0, equation.length - 1), lastItem + '.'])
      },
      erase(input) {
        if(input === 'AC') setEquation(handleOutput.ac());
        else if(input === 'DEL') setEquation(handleOutput.del());
      }
    }
  
    //Handle any click event 
    const handleClick = (event) => {
      const value = event.target.innerText;
      
      switch(true){
        case SPECIAL_KEYS.indexOf(value) !== -1:
          handleInput.specialKey(value);
          break;
        case OPERATORS.indexOf(value) !== -1:
          handleInput.op(value);
          break;
        case NUMBERS.indexOf(value) !== -1:
          handleInput.num(value);
          break;
        case ERASE.indexOf(value) !== -1: 
          handleInput.erase(value);
          break;
      }
     }
    
    return (
      <div id="calc">
        <div id="header">
          <div className="header-left">
            <h3>CASIO</h3>
            <div className="header-left-bottom">
              <span>fx-991ES PLUS</span><br/>
              <span className="green-text">NATURAL-V.P.A.M</span>
            </div>
          </div>
          <div className="header-right">
            <div className="lines"></div>          
          </div>
        </div>
        <Display value={output}/>
        <Numpad handleClick={handleClick}/>
      </div>
    )
  }
  
  export default Calc;
  // ReactDOM.render(<Calc/>, document.getElementById('app'));
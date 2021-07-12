import React from 'react';
import '../App.css';

export default function Numpad({handleClick, keys}){  
    const KEYS = keys;

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
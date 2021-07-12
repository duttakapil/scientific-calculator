import React from 'react';
import '../App.css';

export default function Display({value}){
    return (
        <div id="display">
            <p id="display_input">{value}</p>
        </div>
    )
}
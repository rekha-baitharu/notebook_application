import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Abcd from "./abcd";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  // <BrowserRouter>
    <Abcd />
    // </BrowserRouter>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

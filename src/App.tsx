import React from 'react';
import logo from './logo.svg';
import './App.css';
import ModalButton from './Modal/ModalButton';
import img from './Modal/Images/workshop.jpg';

function App() {
  const style = "btn btn-primary rounded-5"
  const obj = {
    Price:100,
    name:"Solidity Course" ,
    style:style,
    image:img,
    description:"Solidity is a programming language for developing smart contracts on the Ethereum blockchain.",
  }
  return (
    <ModalButton {...obj}/>
  );
}

export default App;

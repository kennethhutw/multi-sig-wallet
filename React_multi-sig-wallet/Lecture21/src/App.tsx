import React from 'react';
import logo from './logo.svg';
import {Message, Button} from "semantic-ui-react";
import './App.css';

function App() {

  const account ="0x123456"
  return (
    <div className="App">
      <header className="App-header">
       <h1>Multi Sig Wallet</h1>
       <div>Account :{account}</div>
       <Message warning>Metamask is connect</Message>
       <Button 
       color="green">
        Connect to Metamask
       </Button>
      </header>
    </div>
  );
}

export default App;

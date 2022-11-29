import React from 'react';
import logo from './logo.svg';
import {Message, Button} from "semantic-ui-react";
import './App.css';

import {useWeb3Context} from "./contexts/Web3";
import {unlockAccount} from "./api/web3";
import Network from './app/Network';
import MultiSigWallet from './app/MultiSigWallet';
import useAsync from "./components/useAsync";

function App() {

  const {
    state:{account, netId},
    updateAccount
  } = useWeb3Context();

  const {pending, error, call} = useAsync(unlockAccount);

  async function onClickConnect(){
    const {error, data} = await call(null);

    if(error){
      console.error(error);
    }
    if(data){
      updateAccount(data);

    }

  }

  return (
    <div className="App">
      <header className="App-header">
       <h1>Multi Sig Wallet</h1>
       {account ?(
        <> {netId !==0 && <Network netId={netId} />}
       <div>Account :{account}</div>
       <MultiSigWallet />
        </>
       ): (<>
       {error? (
        <Message error>{error.message}</Message>
       ):(
        <Message warning>Metamask is not connected</Message>
       )}
      <Button 
          color="green"
          onClick={()=>onClickConnect()}
          disabled={pending}
          loading={pending}
          >
            Connect to Metamask
          </Button>

       </>)
       }
      
       {/* <Message warning>Metamask is connect</Message> */}
     
      </header>
    </div>
  );
}

export default App;

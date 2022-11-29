import React,{useState} from "react";
import { useMultiSigWalletContext } from "../contexts/MultiSigWallet";
import DepositForm from "./DepositForm";


function MultiSigWallet(){
    const {state} = useMultiSigWalletContext();
    return (
        <div>
            <div>Contract: {state.address}</div>
            <h3>Balance:{state.balance}</h3>
            <DepositForm/>
            <h3>Owners</h3>
            <ul>
                {
                    state.owners.map((owner, i)=>(
                        <li key={i}>{owner}</li>
                    ))
                }
            </ul>
            <div>Confirmation required: {state.numConfirmationsRequired}</div>
            <h3>Transactions :({state.transactionCount})</h3>
            
        </div>
    )

}

export default MultiSigWallet;

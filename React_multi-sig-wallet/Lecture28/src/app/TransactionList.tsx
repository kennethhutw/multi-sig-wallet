import React from "react";
import Web3 from "web3";
import BN from "bn.js";

interface Transaction{
    txIndex:number;
    to:string;
    value:BN;
    data:string;
    executed:boolean;
    numConfirmations: number;
    isConfirmedByCurrentAccount:boolean;
}

interface Props{
    numConfirmationsRequired:number;
    count:number;
    data:Transaction[];
}


const TransactionList : React.FC<Props>=({
    numConfirmationsRequired,
    count,
    data
})=>{
 return(
    <ul>
        {data.map(tx=>(
            <li key ={tx.txIndex}>
               <div>  Tx Index: {tx.txIndex}</div>
               <div>  To: {tx.to}</div>
               <div>  Value: {tx.value.toString()}</div>
               <div>  Data: {tx.data}</div>
               <div>  Executed: {tx.executed.toString()}</div>
               <div>  Confirmations: {tx.numConfirmations}</div>
            </li>
        ))}
    </ul>
 )

}

export default TransactionList;

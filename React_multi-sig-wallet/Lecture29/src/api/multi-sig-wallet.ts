import Web3 from "web3";
import BN from "bn.js";
// @ts-ignore
import TruffleContract from "@truffle/contract";

import multiSigWalletTruffle  from "../build/contracts/MultiSigWallet.json";

// @ts-ignore
const MultiSigWallet = TruffleContract(multiSigWalletTruffle);

interface Transaction{
    txIndex:number;
    to:string;
    value:BN;
    data:string;
    executed:boolean;
    numConfirmations: number;
    isConfirmedByCurrentAccount:boolean;
}

interface GetResponse{
    address:string;
    balance:string;
    owners:string[];
    numConfirmationsRequired:number;
    transactionCount:number;
    transactions:Transaction[]; 
}

export async function get(web3:Web3, account:string): Promise<GetResponse>{
    debugger;
    MultiSigWallet.setProvider(web3.currentProvider);

     const multiSig = await MultiSigWallet.deployed();

     const balance = await web3.eth.getBalance(multiSig.address);
     const owners = await multiSig.getOwners();
     const numConfirmationsRequired = await multiSig.numConfirmationsRequired();
     const transactionCount = await multiSig.getTransactionCount();

     const count = transactionCount.toNumber();
     const transactions: Transaction[]=[];

     for(let i = 1; i <10;  i++){
        const txIndex = count -i;
        if(txIndex< 0){
            break;
        }

        const tx = await multiSig.getTransaction(txIndex);
        const isConfirmed = await multiSig.isConfirmed(txIndex, account);

        transactions.push({
            txIndex,
            to: tx.to,
            value:tx.value,
            data:tx.data,
            executed: tx.executed,
            numConfirmations: tx.numConfirmations.toNumber(),
            isConfirmedByCurrentAccount:isConfirmed
        })
     }

     return { 
        address:multiSig.address,
        balance,
        owners,
        numConfirmationsRequired:numConfirmationsRequired.toNumber(),
        transactionCount:count,
        transactions }
       
     
}


export async function deposit(
    web3:Web3,
    account:string,
    params:{
        value:BN;
    }
){
    MultiSigWallet.setProvider(web3.currentProvider);
    const multiSig = await MultiSigWallet.deployed();

    await multiSig.sendTransaction({from :account, value: params.value});
}

export async function submitTx(
    web3:Web3,
    account:string,
    params:{
        to:string,
        value:string,
        data:string
    }
) {
    const {to, value, data} = params;
    
    MultiSigWallet.setProvider(web3.currentProvider);

    const multiSig = await MultiSigWallet.deployed();

    await multiSig.submitTransaction(to, value, data,{
        from :account
    })
}



export async function confirmTx(
    web3:Web3,
    account:string,
    params:{
        txIndex:number
    }
) {
    const {txIndex} = params;
    
    MultiSigWallet.setProvider(web3.currentProvider);

    const multiSig = await MultiSigWallet.deployed();

    await multiSig.confirmTransaction(txIndex,{
        from :account
    })
}

export async function revokeConfirmation(
    web3:Web3,
    account:string,
    params:{
        txIndex:number
    }
) {
    const {txIndex} = params;
    
    MultiSigWallet.setProvider(web3.currentProvider);

    const multiSig = await MultiSigWallet.deployed();

    await multiSig.revokeConfirmation(txIndex,{
        from :account
    })
}



export async function executeTx(
    web3:Web3,
    account:string,
    params:{
        txIndex:number
    }
) {
    const {txIndex} = params;
    
    MultiSigWallet.setProvider(web3.currentProvider);

    const multiSig = await MultiSigWallet.deployed();

    await multiSig.executeTransaction(txIndex,{
        from :account
    })
}
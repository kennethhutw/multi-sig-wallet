import React from "react";

interface Props{
    netId:number;
}

function getNetwork(netId:number){
   switch(netId){
    case 1:
         return "Mainnet";
    case 5:
         return "Goerli test network";
    case 5777:
        return "Ganache";
    default:
        return "Unknow network";
   }
}

const Network:React.FC<Props>=({netId})=>{
    return <div>{getNetwork(netId)}</div>
}

export default Network;

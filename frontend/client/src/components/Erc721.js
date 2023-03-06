import { useState } from "react";
import Web3 from "web3";
import erc721Abi from "../erc721Abi";

function Erc721({ erc721list }) {
    return (
        <div className="erc721list">
            {erc721list.map((token) => {
                return (
                    <div className="erc721token">
                        Name: <span className="name">{token.name}</span>(
                        <span className="symbol">{token.symbol}</span>)
                        
                        <div className="nft">id: {token.tokenId}</div>
                        <img src={token.tokenURI} width={300} />
                    </div>
                );
            })}
        </div>
    );
}

export default Erc721;
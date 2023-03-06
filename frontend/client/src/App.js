import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import erc721Abi from './erc721Abi';
import TokenList from "./components/TokenList"

function App() {
  const [ web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  //newErc721addr 상태는 입력받은 컨트랙트 주소를 저장합니다. 컨트랙트 주소를 입력하고 버튼을 누르면 addNewErc721Token() 이 실행됩니다.

  const [newErc721addr, setNewErc721Addr] = useState();
  const [erc721list, setErc721list] = useState([]);  // 자신의 NFT 정보를 저장할 토큰

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const web = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web);
        } catch (err) {
          console.log(err);
        }
      }
    };
    init();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };
const addNewErc721Token = async () => {
    const tokenContract = await new web3.eth.Contract(
      erc721Abi,
      newErc721addr
    )
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    let arr = [];
    //토큰의 총 발행량만큼 반복문을 돈다.
		  for (let i = 1; i <= totalSupply; i++) {
		      arr.push(i);
		  }
		  
		  for (let tokenId of arr) {
        //Contract.methods.ownerOf() 를 통해 각 토큰의 오너 주소를 받아온다.
		      let tokenOwner = await tokenContract.methods
		          .ownerOf(tokenId)
		          .call();
            //해당 주소가 dApp으로 연결한 계정 주소와 같은지 확인한다.
            //같다면, Contract.methods.tokenURI() 를 사용해 해당 토큰의 URI 값을 가져온다.
		      if (String(tokenOwner).toLowerCase() === account) {
		          let tokenURI = await tokenContract.methods
		              .tokenURI(tokenId)
		              .call();
            //토큰 정보를 저장한다.
		          setErc721list((prevState) => {
		              return [...prevState, { name, symbol, tokenId, tokenURI }];
		          });
		      }
		  }
	}

  return (
    <div className="App">
      <button className="metaConnect" onClick={connectWallet}>
        connect to MetaMask
      </button>
      {account && (
        <div className="userInfo">주소: {account}</div>
      )}
      <div className="newErc721">
	    <input
	        type="text"
	        onChange={(e) => {
            setNewErc721Addr(e.target.value);  // 입력받을 때마다 newErc721addr 갱신
	        }}
	    ></input>
	    <button onClick={addNewErc721Token}>add new erc721</button>
	</div>
  <TokenList erc721list={erc721list} />
    </div>
    
  );
}



export default App;
// import { useState, useEffect } from 'react';
// import Web3 from 'web3';

// function App() {
//   const [web3, setWeb3] = useState(null);
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       if (typeof window.ethereum !== 'undefined') {
//         try {
//           const web = new Web3(window.ethereum);
//           await window.ethereum.enable();
//           setWeb3(web);
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     };
//     init();
//   }, []);

//   const connectWallet = async () => {
//     try {
//       const accounts = await window.ethereum.request({
//         method: 'eth_requestAccounts',
//       });
//       setAccount(accounts[0]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="App">
//       <button className="metaConnect" onClick={connectWallet}>
//         connect to MetaMask
//       </button>
//       {account && (
//         <div className="userInfo">주소: {account}</div>
//       )}
//     </div>
//   );
// }
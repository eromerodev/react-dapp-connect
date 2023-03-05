import { useState } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);

  function getProvider() {
    if (window.ethereum) {
      return window.ethereum;
    }
  }

  /*
  function getWeb3Provider() {
    if (window.web3) {
      return window.web3.currentProvider;
    }
  }
  */

  async function requestAccount() {

    const provider = getProvider();
    if(!provider) {
      alert('Please install MetaMask!');
      return;
    }

    await provider.request({ method: "eth_requestAccounts" });

    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const account = accounts[0];
    const balance = await web3.eth.getBalance(account);
    console.log(balance);

    setConnected(true);
    setAccount(account);

  }

  function logout() {
    setConnected(false);
  }


  return (
    <div className="container">
      <header>
        <h3>Dapp Authentication with Metamask</h3>
      </header>
      <div className='content'>
        {connected && 
        (
          <div>
            Wallet connected
            <p>Account: {account}</p>
          </div> 
          
        )}

        <button className="button-1" onClick={requestAccount}>Connect</button>
        
        <button className="button-2" onClick={logout} >Logout</button>
      </div>
    </div>
  );
}

export default App;

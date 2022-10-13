import abiMainContract from "./abis/MainContract.json";
import abiRopstamToken from "./abis/RopstamContract.json";
import abiHammerToken from "./abis/HammerContract.json";
import abiOpenApesToken from "./abis/OpenApesContract.json";
import { ethers, utils } from "ethers";
import React, { useEffect, useState } from "react";
import { handleBreakpoints } from "@mui/system";
export default function App() {
  // Contract Address & ABI
  const mainContractAddress = "0x6C2C8eD60dfa6242BD6EA407Ad0F2B3Ba6ec8FC8";
  const mainContractABI = abiMainContract.abi;
  const ropstamContractAddress = "0x732983a0CbCAf7bDC7576D05d7424A20A6A6f2f8";
  const ropstamContractABI = abiRopstamToken.abi;
  const hammerContractAddress = "0xeCf643f84F561DFeD1eA74466382629311d7EB81";
  const hammerContractABI = abiHammerToken.abi;
  const openApesContractAddress = "0xB665F97C8FE4c0e651D6A10a3903ccf3377f54d2";
  const openApesContractABI = abiOpenApesToken.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [walletStatus, setWalletStatus] = useState("Connect Wallet");

  //Rospstam
  const [ropstamAmount, setRopstamAmount] = useState(null);
  const [amount, setAmount] = useState(null);
  const [balance, setBalance] = useState("");
  //OpenApes
  const [uri, setUri] = useState("");

  //useEffect
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  //Setting Uri
  const onUriChange = (e) => {
    setUri(e.target.value);
  };
  const onRopstamAmountChange = (e) => {
    setRopstamAmount(e.target.value);
  };

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      setWalletStatus("Connected");
    } catch (error) {
      console.log(error);
    }
  };

  const buyRopstam = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          mainContractAddress,
          mainContractABI,
          signer
        );

        const price = (Number(100) * Number(ropstamAmount)).toString();
        // console.log(price);
        console.log(currentAccount);
        // const options = { value: ethers.utils.parseEther("price") };
        console.log("buying ropstam..");
        try {
          const txn = await contract.buyRopstamToken(ropstamAmount, {
            value: price,
          });
          await txn.wait();
          alert("You Have Purchased Rospstam Tokens Successfully!!");
          console.log("Ropstam purchased!");
          setAmount(null);
        } catch (e) {
          console.log("Error is", e);
        }

        // Clear the form fields.
        // setRopstamAmount(null);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const buyHammer = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const mainContract = new ethers.Contract(
          mainContractAddress,
          mainContractABI,
          signer
        );

        const ropstamContract = new ethers.Contract(
          ropstamContractAddress,
          ropstamContractABI,
          signer
        );

        const openApesContract = new ethers.Contract(
          openApesContractAddress,
          openApesContractABI,
          signer
        );
        const b = Number(await openApesContract.balanceOf(currentAccount));
        console.log("bbb", Number(b));
        //Checking If Owns OpenApes then He cannot buy Hammer
        if (b === 0) {
          //Checking If User have ropstam token or not
          const balance = await ropstamContract.balanceOf(currentAccount);
          console.log("Balnce is :", balance.toString());
          if (balance >= ropstamAmount) {
            console.log("Approving");
            //try catch for approving token
            try {
              //Approving Ropstam Token to Main Contract
              const res = await ropstamContract.approve(
                mainContractAddress,
                ropstamAmount
              );
              await res.wait();
              console.log(`Result : ${res}`);
            } catch (e) {
              console.log("Not Approved");
              alert(e);
            }
            //try catch for buying hammer Token
            console.log("Buying Hammer Token");
            try {
              const _res = await mainContract.buyHammer(ropstamAmount);
              await _res.wait();
              console.log("Succesffully Purchased");
              alert("Succesffully Purchased");
            } catch (e) {
              console.log(e);
              alert(e);
            }
          } else {
            alert("You have not enough ropstam Token to Buy Hammer Token");
          }
        } else {
          console.log("You have OpenApes You cannot buy Hammer Token");
          alert("You have OpenApes You cannot buy Hammer Token");
        }

        // Clear the form fields.
        setRopstamAmount(null);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  const buyOpenApes = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const mainContract = new ethers.Contract(
          mainContractAddress,
          mainContractABI,
          signer
        );

        const ropstamContract = new ethers.Contract(
          ropstamContractAddress,
          ropstamContractABI,
          signer
        );
        const hammerContract = new ethers.Contract(
          hammerContractAddress,
          hammerContractABI,
          signer
        );
        const b = await hammerContract.balanceOf(currentAccount);
        console.log("bbb", Number(b));
        //Checking If Owns OpenApes then He cannot buy Hammer
        if (Number(b) == 0) {
          const balance = await ropstamContract.balanceOf(currentAccount);
          console.log("Balance is :", balance.toString());
          if (balance >= 100) {
            console.log("Approving");
            //try catch for approving token
            try {
              //Approving Ropstam Token to Main Contract
              const res = await ropstamContract.approve(
                mainContractAddress,
                ropstamAmount
              );
              await res.wait();
              console.log(`Result : ${res}`);
            } catch (e) {
              console.log("Not Approved");
              alert(e);
            }
            //try catch for buying hammer Token
            console.log("Buying Open Apes Token");
            try {
              setUri("ipfs://QmekP8vKXd2iysWV53oezQgjXmqKA2SZftR7ocLEp61rq7");
              const _res = await mainContract.buyOpenApes(
                ropstamAmount,
                "ipfs://QmekP8vKXd2iysWV53oezQgjXmqKA2SZftR7ocLEp61rq7"
              );
              await _res.wait();
              console.log("Succesffully Purchased");
            } catch (e) {
              console.log(e);
              alert(e);
            }
          } else {
            alert("You have not enough ropstam Token to Buy Hammer Token");
          }
        } else {
          console.log("You have Hammer You cannot buy Open Apes Token");
          alert("You have Hammer You cannot buy Open Apes Token");
        }

        // Clear the form fields.
        // setRopstamAmount(null);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  const ropstamBalance = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const ropstamContract = new ethers.Contract(
          ropstamContractAddress,
          ropstamContractABI,
          signer
        );
        const balance = await ropstamContract.balanceOf(ropstamAmount);
        setBalance(balance.toString());
        console.log(`Balance of ${ropstamAmount} :`, balance.toString());
      }
    } catch (e) {
      alert(e);
    }
  };
  const hammerBalance = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const hammerContract = new ethers.Contract(
          hammerContractAddress,
          hammerContractABI,
          signer
        );
        const balance = await hammerContract.balanceOf(ropstamAmount);
        setBalance(balance.toString());
        console.log(`Balance of ${ropstamAmount} :`, balance.toString());
      }
    } catch (e) {
      alert(e);
    }
  };
  const check = async () => {
    console.log("connected address: ", currentAccount);
  };
  return (
    <>
      <button onClick={connectWallet}>{walletStatus}</button>
      {currentAccount && (
        <div>
          <h1>Buy Ropstam Tokens</h1>
          <div>
            <div>
              <label>Enter Amount to Buy</label>
              <br></br>
              <input
                id="amount"
                type="text"
                placeholder="Enter the Quantity"
                onChange={onRopstamAmountChange}
              ></input>
              <br></br>
              <button onClick={buyRopstam}>Buy Ropstam</button>
            </div>
          </div>
        </div>
      )}

      {currentAccount && (
        <div>
          <h1>Buy Hammer Tokens</h1>
          <h3>100 Ropstam Tokens: 1 Hammer Token</h3>
          <div>
            <div>
              <label>Enter Amount to Buy</label>
              <br></br>
              <input
                id="amount"
                type="text"
                placeholder="Enter the Ropstam Token Quantity"
                onChange={onRopstamAmountChange}
              ></input>
              <br></br>
              <button onClick={buyHammer}>Buy Hammer</button>
            </div>
          </div>
        </div>
      )}
      {currentAccount && (
        <div>
          <h1>Buy Open Apes Token</h1>
          <h3>100 Ropstam Tokens: 1 Open Apes Token</h3>
          <div>
            <div>
              <label>Enter Amount to Buy</label>
              <br></br>
              <input
                id="amount"
                type="text"
                placeholder="Ropstam Quantity"
                onChange={onRopstamAmountChange}
              ></input>
              <br></br>
              <button onClick={buyOpenApes}>Buy OpenApes</button>
            </div>
          </div>
        </div>
      )}

      {/* {currentAccount && (
        <div>
          <h1>Check Balances of following Tokens</h1>
          <input
            id="amount"
            type="text"
            placeholder="Enter Your Address"
            onChange={onRopstamAmountChange}
          ></input>
          <button onClick={ropstamBalance}>Ropstam Balance</button>
          <b>{balance}</b>
          <br></br>
          <input
            id="amount"
            type="text"
            placeholder="Enter Your Address"
            onChange={onRopstamAmountChange}
          ></input>
          <button onClick={hammerBalance}>Hammer Balance</button>
          <b>{balance}</b>
        </div>
      )} */}
      {/* <button onClick={check}>check</button> */}
    </>
  );
}

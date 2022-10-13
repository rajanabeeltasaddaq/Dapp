import * as React from "react";
import { ethers } from "ethers";
// import Ropstam from "../abis/RopstamContract.json";

function RopstamToken() {
  const [num, setNum] = React.useState(0);
  //Buy Token
  const [provider, setProvider] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const [signer, setSigner] = React.useState(null);
  const RopstamBuyTokenAbi = [
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "_RopstamTokenAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "RopstamHolder",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "buy",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_holder",
          type: "address",
        },
      ],
      name: "setHolder",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "_withdrawalAddress",
          type: "address",
        },
      ],
      name: "withdrawEther",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  //Ropstam Token
  const [rContract, setRContract] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [accountAddress, setAccountAddress] = React.useState(null);
  const RopstamTokenAbi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "calculateFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "fee",
          type: "uint256",
        },
      ],
      name: "calculateTransfer",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  React.useEffect(() => {
    const loadProvider = async () => {
      let BuyingContractAddress = "0xcD7B8137D4DB600c65273F37eA78aA21892Ef7E4";
      let mainContractAddress= "";
      let RopstamContractAddress = "0xdA7ac49673A102E76794E6f2AD826d4E09a8e852";
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      let tempSigner = tempProvider.getSigner();
      console.log("nabeel", tempSigner);
      setSigner(tempSigner);
      const _contract = new ethers.Contract(
        BuyingContractAddress,
        RopstamBuyTokenAbi,
        signer
      );
      setContract(_contract);
      const _ropstamContract = new ethers.Contract(
        RopstamContractAddress,
        RopstamTokenAbi,
        provider
      );
      setRContract(_ropstamContract);
    };
    loadProvider();
  }, []);

  React.useEffect(() => {
    const getBalance = async () => {
      try {
        const res = await rContract.balanceOf(accountAddress.toString());
        console.log("Balance is ", res.toString());
        setBalance(res.toString());
        console.log(contract.address);
      } catch (e) {
        console.log(e);
      }
    };
    getBalance();
  }, []);

  const getBalance = async () => {
    try {
      const res = await rContract.balanceOf(accountAddress.toString());
      console.log("Balance is ", res.toString());
      setBalance(res.toString());
      console.log(contract.address);
    } catch (e) {
      console.log(e);
    }
  };

  const buyHammer = async (event) => {
    event.preventDefault();

    // const _contract = contract.connect(signer);
    // const res = await _contract.buy(num);
    const res = contract.buy(num, {
      value: (100 * num).toString(),
    });
    console.log(res);
  };

  return (
    <>
      <h2>Buy Hammer Token here Paying Through Ropstam Token</h2>
      <h3>1 Hammer Token : 100 Ropstam Tokens</h3>
      {/* <button onClick={getBalance}>Check Balance</button> */}

      <form onSubmit={buyHammer}>
        <input
          placeholder="Enter The Amount You Wanna Buy"
          onChange={(e) => {
            setNum(e.target.value);
            console.log(num);
          }}
        ></input>
        <br />
        <button type="submit">Buy Hammer</button>
      </form>
    </>
  );
}

export default RopstamToken;

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
          name: "_hammerTokenAddress",
          type: "address",
        },
        {
          internalType: "contract IERC20",
          name: "_ropstamTokenAddress",
          type: "address",
        },
        {
          internalType: "contract IERC721",
          name: "_openApesTokenAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_ropstamHolderAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_hammerHolderAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_openApesHolderAddress",
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
          indexed: false,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "AddedOwner",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "removedOwner",
          type: "address",
        },
      ],
      name: "RemovedOwner",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_newOwner",
          type: "address",
        },
      ],
      name: "addOwner",
      outputs: [],
      stateMutability: "nonpayable",
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
      name: "buyHammer",
      outputs: [],
      stateMutability: "nonpayable",
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
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "buyOpenApes",
      outputs: [],
      stateMutability: "nonpayable",
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
      name: "buyRopstam",
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
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "owner",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_toRemove",
          type: "address",
        },
      ],
      name: "removeOwner",
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
      let BuyingContractAddress = "0x070A511a825981B8BF890a43052e833934a96714";
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

  const buyRopstam = async (event) => {
    // event.preventDefault();

    // const _contract = contract.connect(signer);
    // const res = await _contract.buy(num);
    const res = await contract.buyRopstam(num, {
      value: (100 * num).toString(),
    });
    console.log(res);
  };

  return (
    <>
      <h2>Buy Ropstam Token here</h2>
      {/* <button onClick={getBalance}>Check Balance</button> */}
      <input
        placeholder="Enter Account Address"
        onChange={(e) => {
          setAccountAddress(e.target.value);
        }}
      ></input>
      <br />
      <button onClick={getBalance}>Balance</button>
      <h2>
        Balance on Address : <br />
        {accountAddress} id <br />
        {balance}
      </h2>
      <form onSubmit={buyRopstam}>
        <input
          placeholder="Enter The Amount You Wanna Buy"
          onChange={(e) => {
            setNum(e.target.value);
            console.log(num);
          }}
        ></input>
        <br />
        <button type="submit">Buy Token</button>
      </form>
    </>
  );
}

export default RopstamToken;

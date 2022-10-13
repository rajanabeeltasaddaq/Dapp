const { ethers } = require("hardhat");
const hre = require("hardhat");
const Abi = require("../artifacts/contracts/MainContract.sol/MainContract.json");
const prompt = require("prompt-sync")();

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(`Signer Address is : ${owner.address}`);
  //contract
  //   const contractAddress = "0xB665F97C8FE4c0e651D6A10a3903ccf3377f54d2";
  const mainContractAddress = "0x6C2C8eD60dfa6242BD6EA407Ad0F2B3Ba6ec8FC8";
  const abi = Abi.abi;

  const contract = new ethers.Contract(mainContractAddress, abi, owner);
  if ((await hre.ethers.provider.getBalance(mainContractAddress)) > 0) {
    //   Ether receiver address
    const _address = prompt("Enter Receiver Address");
    //Withdrawing Ethers from Main Contract
    try {
      const res = await contract.withdrawEther(_address);
      await res.wait();
      console.log(
        "================================================================="
      );
      console.log("Ethers Sended to Address: ", _address);
      console.log(
        "================================================================="
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Contract Have not enough Ethers to Withdraw");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

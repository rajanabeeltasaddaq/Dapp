/**
 * @Author  Nabeel Ahmed
 * @dev     A Script that can be used to withdraw Ethers from Contract
 *          Ethers can only be withdrawn by the Owner of Smart Contract
 *          If the Contract Balance is 0 then Withdraw Function will not
 *          be called.
 * @notice  Only Owner Can Withdraw Ether
 */
const { ethers } = require("hardhat");
const hre = require("hardhat");
const Abi = require("../artifacts/contracts/RopstamToken.sol/RopstamToken.json");
const prompt = require("prompt-sync")();

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(`Signer Address is : ${owner.address}`);
  //contract
  const contractAddress = "0x6C2C8eD60dfa6242BD6EA407Ad0F2B3Ba6ec8FC8";
  const ropstamContractAddress = "0x732983a0CbCAf7bDC7576D05d7424A20A6A6f2f8";
  const abi = Abi.abi;

  const contract = new ethers.Contract(ropstamContractAddress, abi, owner);

  const balance = await contract.balanceOf(contractAddress);
  console.log("Before Transfer Balance: ", balance);
  //   const res = await contract.transfer(contractAddress, 10000);
  //   await res.wait();

  //   balance = await contract.balanceOf(contractAddress);
  //   console.log("After Transfer Balance: ", balance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

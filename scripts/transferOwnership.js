const { ethers } = require("hardhat");
const hre = require("hardhat");
const Abi = require("../artifacts/contracts/OpenApesToken.sol/OpenApes.json");

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(`Signer Address is : ${owner.address}`);
  //contract
  const contractAddress = "0xB665F97C8FE4c0e651D6A10a3903ccf3377f54d2";
  const mainContractAddress = "0x6C2C8eD60dfa6242BD6EA407Ad0F2B3Ba6ec8FC8";
  const abi = Abi.abi;

  const contract = new ethers.Contract(contractAddress, abi, owner);
  const res = await contract.owner();
  console.log("owner is : ", res);
  //Transfering Ownership of Open Apes to Main Contract
  try {
    const res = await contract.transferOwnership(mainContractAddress);
    await res.wait();
    console.log("success");
  } catch (e) {
    console.log(e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

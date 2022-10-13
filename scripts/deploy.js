const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(`Signer Address is : ${owner.address}`);
  //Hammer Token deploy
  const HammerToken = await ethers.getContractFactory("MyToken");
  const hammerToken = await HammerToken.deploy();
  await hammerToken.deployed();
  console.log(`Hammer Contract Deployed at Address : ${hammerToken.address}`);
  //Deploy Ropstam ERC20 Token
  const RopstamToken = await ethers.getContractFactory("RopstamToken");
  const ropstamToken = await RopstamToken.deploy();
  await ropstamToken.deployed();
  //Logging to Console
  console.log(`Ropstam Contract Deployed at Address : ${ropstamToken.address}`);
  //Deploy Open Apes ERC721 Token
  const OpenApesToken = await ethers.getContractFactory("OpenApes");
  const openApesToken = await OpenApesToken.deploy();
  await openApesToken.deployed();
  //Logging to Console
  console.log(
    `Open Apes Contract Deployed at Address : ${openApesToken.address}`
  );
  //Deploy MainContract
  const MainContract = await ethers.getContractFactory("MainContract");
  const mainContract = await MainContract.deploy(
    hammerToken.address,
    ropstamToken.address,
    openApesToken.address,
    owner.address,
    owner.address,
    owner.address,
    owner.address
  );
  //Logging to Console
  console.log(`Main Contract Deployed at Address : ${mainContract.address}`);
  await mainContract.deployed();
  //Approve Ropstam Token to MainContract
  await ropstamToken.connect(owner).approve(mainContract.address, 50000);
  //Approve Hammer Token to MainContract
  await hammerToken.connect(owner).approve(mainContract.address, 10000);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

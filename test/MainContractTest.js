const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployRopstamFixture() {
    //contract deployed by first signer by default
    const [owner, otherAccount1, otherAccount2, otherAccount3, otherAccount4] =
      await ethers.getSigners();
    //Deploy Hammer ERC20 Token
    const HammerToken = await ethers.getContractFactory("MyToken");
    const hammerToken = await HammerToken.deploy();

    //Deploy Ropstam ERC20 Token
    const RopstamToken = await ethers.getContractFactory("RopstamToken");
    const ropstamToken = await RopstamToken.deploy();
    //Deploy Open Apes ERC721 Token
    const OpenApesToken = await ethers.getContractFactory("OpenApes");
    const openApesToken = await OpenApesToken.deploy();
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
    //Approve Ropstam Token to MainContract
    await ropstamToken.connect(owner).approve(mainContract.address, 50000);
    //Approve Hammer Token to MainContract
    await hammerToken.connect(owner).approve(mainContract.address, 10000);
    //Transfering OpenApes contract ownership to Main Contract
    await openApesToken.connect(owner).transferOwnership(mainContract.address);

    return {
      hammerToken,
      ropstamToken,
      openApesToken,
      mainContract,
      owner,
      otherAccount1,
      otherAccount2,
    };
  }

  describe("Deployment", function () {
    it("Ropstam Token Contract Deployed Successfully", async () => {
      const { ropstamToken, owner } = await loadFixture(deployRopstamFixture);
      const balance = await ropstamToken.balanceOf(owner.address);
      // const balance = ropstamToken.address;
      console.log(`balance is ${balance}`);
      // expect(ropstamToken.address).not.to.equal(address(0));
    });
  });
  describe("Buy Ropstam Token", function () {
    it("it should get ropstam token", async () => {
      const {
        mainContract,
        hammerToken,
        ropstamToken,
        owner,
        otherAccount1,
        otherAccount2,
      } = await loadFixture(deployRopstamFixture);
      const options = { value: ethers.utils.parseEther("0.0000000000001") };
      //OtherAdrress1 is Buying Ropstam Token
      // const res = await mainContract
      //   .connect(otherAccount1)
      //   .buyRopstamToken(1000, options);
      //OtherAdrress2 is Buying Ropstam Token
      await mainContract.connect(otherAccount2).buyRopstamToken(1000, options);
      //Checking Balance
      let balance = await ropstamToken.balanceOf(otherAccount2.address);
      console.log(balance);
      // expect(balance).to.be.greaterThan(700);
      //approve
      await ropstamToken
        .connect(otherAccount2)
        .approve(mainContract.address, 100);

      //Buy Hammer Token
      await mainContract.connect(otherAccount2).buyHammer(100);
      balance = await hammerToken.balanceOf(otherAccount2.address);
      console.log(balance);
      //Buy Open Apes Token
    });
    it("it should get ropstam token", async () => {
      const {
        mainContract,
        openApesToken,
        ropstamToken,
        owner,
        otherAccount1,
        otherAccount2,
      } = await loadFixture(deployRopstamFixture);
      const options = { value: ethers.utils.parseEther("0.0000000000001") };
      //OtherAccount2 is buying ropstam
      await mainContract.connect(otherAccount2).buyRopstamToken(1000, options);
      //Checking ropstam Balance
      let balance = await ropstamToken.balanceOf(otherAccount2.address);
      console.log(balance);
      // expect(balance).to.be.greaterThan(700);
      //approve
      await ropstamToken
        .connect(otherAccount2)
        .approve(mainContract.address, 100);

      //Buy Hammer Token
      await mainContract.connect(otherAccount2).buyOpenApes(100, "gg");
      balance = await openApesToken.balanceOf(otherAccount2.address);
      console.log(balance);
      //Buy Open Apes Token
    });
  });
});

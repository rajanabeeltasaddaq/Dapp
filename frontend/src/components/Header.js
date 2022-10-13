import React, { useState, useEffect } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar } from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import BuyToken from "./BuyToken";
import HammerToken from "./HammerToken";
import OpenApesToken from "./OpenApesToken";
import { ethers } from "ethers";

const Header = () => {
  const [value, setValue] = useState(0);
  const [walletStatus, setWalletStatus] = useState("Connect Metamask");
  //Hooks for Wallet Connection
  const [walletAddress, setWalletAddress] = useState("");

  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  // async function requestAccount() {
  const requestAccount = async () => {
    console.log("Requesting account...");

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setWalletStatus(walletAddress);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  // Create a provider to interact with a smart contract
  // async function connectWallet() {

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }} position="sticky">
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />

          <Tabs
            sx={{ marginLeft: "auto" }}
            indicatorColor="secondary"
            textColor="inherit"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Ropstam Token" />
            <Tab label="Hammer Token" />
            <Tab label="Open Apes" />
          </Tabs>

          <Button
            sx={{ marginLeft: "auto" }}
            variant="contained"
            onClick={connectWallet}
          >
            {walletStatus.slice(1, -37)}
            ....
            {walletStatus.slice(37)}
          </Button>
        </Toolbar>
      </AppBar>
      {value === 0 && <BuyToken />}
      {value === 1 && <HammerToken />}
      {value === 2 && <OpenApesToken />}
    </React.Fragment>
  );
};

export default Header;

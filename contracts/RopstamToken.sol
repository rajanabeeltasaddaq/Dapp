//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./auxillary/DeflationaryToken.sol";

contract RopstamToken is DeflationaryToken {
    constructor() DeflationaryToken("Ropstam", "RT") {
        _mint(msg.sender, 9000000 * 10**decimals());
    }
}

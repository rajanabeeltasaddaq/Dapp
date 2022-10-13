//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract helpers {
    uint8 _fee = 20;

    function calculateFee(uint256 _amount) public view returns (uint256) {
        return (_amount * _fee) / 100;
    }

    function calculateTransfer(uint256 _amount, uint256 fee)
        public
        pure
        returns (uint256)
    {
        return _amount - fee;
    }
}

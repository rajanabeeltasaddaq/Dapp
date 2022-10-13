// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title The interface for the Buy Ropstam Token
 * @notice This include facilities to Buy Ropstan Tokens
 */
interface IMainContract {
    /**
     * @dev Event emit when Ropstam Token is Purchased
     * @notice Emitted when the token will be Purchased
     * @param buyer buyer Address
     * @param _amount Quantity of Token Purchased
     */
    event PurchasedRopstamToken(address indexed buyer, uint256 _amount);
    /**
     * @dev Event emit when Hammer Token is Purchased
     * @notice Emitted when the token will be Purchased
     * @param buyer buyer Address
     * @param _amount Quantity of Token Purchased
     */
    event PurchasedHammerToken(address indexed buyer, uint256 _amount);
    /**
     * @dev Event emit when Open Apes Token is Purchased
     * @notice Emitted when the token will be Purchased
     * @param buyer buyer Address
     * @param _amount Quantity of Token Purchased
     */
    event PurchasedOpenApesToken(address indexed buyer, uint256 _amount);

    /**
     * @notice Buy Rospstam Tokens
     * @param _amount Quantity of Tokens Want to buy
     * @dev The passes _amount wiil be transfered to buyer after getting prefered amount of ethers.
     */
    function buyRopstamToken(uint256 _amount) external payable;

    /**
     * @notice Buy Hammer Tokens
     * @param _amount Quantity of Tokens Want to buy
     * @dev The passes _amount wiil be transfered to buyer after getting prefered amount of ethers.
     */
    function buyHammer(uint256 _amount) external;

    /**
     * @notice Buy Rospstam Tokens
     * @param _amount Quantity of Tokens Want to buy
     * @dev The passes _amount wiil be transfered to buyer after getting prefered amount of ethers.
     */
    function buyOpenApes(uint256 _amount, string memory uri) external;

    /**
     * @notice Withdrawing Contract Balance
     * @param _withdrawalAddress Ethers/Balance will be tranfered to this address
     * @dev All balance available in the contract will be tranfered to the _withdrawalAddress but only owner can call this function
     */
    function withdrawEther(address payable _withdrawalAddress)
        external
        payable
        returns (bool);
}

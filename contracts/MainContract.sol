//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IMainContract.sol";

/**
 * @title Main Contract
 * @author @NabeelAhmed
 * @notice It will be used to Buy NFT/HAMMER Tokens by Paying Ropstam Tokens to this Contract
 */
contract MainContract is ReentrancyGuard, IMainContract {
    IERC20 hammerToken;
    IERC721 openApesToken;
    IERC20 ropstamToken;
    //Store Admins/Owner of Contract
    mapping(address => bool) admins;
    // address public RopstamHolder;
    address Owner;
    //Taking Ropstam Holder Address
    address ropstamHolderAddress;
    //Taking Hammer Holder Address
    address hammerHolderAddress;
    //Taking Open Apes Holder Address
    address openApesHolderAddress;

    constructor(
        IERC20 _hammerTokenAddress,
        IERC20 _ropstamTokenAddress,
        IERC721 _openApesTokenAddress,
        address _owner,
        address _ropstamHolderAddress,
        address _hammerHolderAddress,
        address _openApesHolderAddress
    ) {
        hammerToken = IERC20(_hammerTokenAddress);
        openApesToken = IERC721(_openApesTokenAddress);
        ropstamToken = IERC20(_ropstamTokenAddress);
        admins[_owner] = true;
        ropstamHolderAddress = _ropstamHolderAddress;
        hammerHolderAddress = _hammerHolderAddress;
        openApesHolderAddress = _openApesHolderAddress;
    }

    /**
     * @notice Buy Hammer Tokens
     * @param _amount Quantity of Tokens Want to buy
     * @dev The passes _amount wiil be transfered to buyer after getting prefered amount of ethers.
     */
    function buyHammer(uint256 _amount) public {
        //Approve Hammer Token to this contract
        require(
            ropstamToken.balanceOf(msg.sender) >= _amount,
            "You Have Insufficient Ropstam Tokens"
        );
        //Get balance of Hammer
        uint256 _balance = openApesToken.balanceOf(msg.sender);
        require(
            _balance == 0,
            "Sorry..You cannot buy Hammer Because You Have Open Apes"
        );
        require(_amount > 0, "Amount Should be Greater than Zero");
        //Receive Ropstam Token
        ropstamToken.transferFrom(msg.sender, address(this), _amount);
        //Sending Hammer Tokens
        uint256 _sendingAmount = _amount / 100;
        if (hammerToken.balanceOf(address(this)) > _sendingAmount) {
            hammerToken.transfer(msg.sender, _sendingAmount);
        } else {
            hammerToken.transferFrom(
                hammerHolderAddress,
                msg.sender,
                _sendingAmount
            );
        }
    }

    /**
     * @notice Buy Open Apes Tokens
     * @param _amount Quantity of Tokens Want to buy
     * @dev The passes _amount wiil be transfered to buyer after getting prefered amount of ethers.
     */
    function buyOpenApes(uint256 _amount, string memory uri) public {
        //Get balance of Hammer
        uint256 _balance = hammerToken.balanceOf(msg.sender);
        require(
            _balance == 0,
            "Sorry..You cannot buy Open Ape Because You Have Hammer Token"
        );
        require(_amount == 100, "Amount Should be 100 Ropstam Tokens");
        //Receive Ropstam Token
        ropstamToken.transferFrom(msg.sender, address(this), _amount);
        //Sending Nft Token
        openApesToken.safeMint(msg.sender, uri);
    }

    /**
     * @notice Buy Rospstam Tokens
     * @param _amount Quantity of Tokens Want to buy
     * @dev The passes _amount wiil be transfered to buyer after getting prefered amount of ethers.
     */
    function buyRopstamToken(uint256 _amount) external payable {
        require(
            msg.value == 100 wei * _amount,
            "You have insufficient Balance"
        );
        // RopstamToken.transferFrom(address(this), , amount);
        if (ropstamToken.balanceOf(address(this)) > _amount) {
            ropstamToken.transfer(msg.sender, _amount);
        } else {
            ropstamToken.transferFrom(
                ropstamHolderAddress,
                msg.sender,
                _amount
            );
        }
    }

    /**
     * @notice This Function withdraws contract Ethers to _WithdrawalAddress
     * @param _withdrawalAddress Ethers will be sent again this Address
     * @dev Only Admins can call this function
     */

    function withdrawEther(address payable _withdrawalAddress)
        external
        payable
        onlyAdmin
        nonReentrant
        returns (bool)
    {
        uint256 _balance = address(this).balance;
        _withdrawalAddress.transfer(_balance);
        return true;
    }

    /**
     * @dev Modifier so Only Owner can Call
     */
    modifier onlyAdmin() {
        require(admins[msg.sender] == true);
        _;
    }

    /**
     * @dev Function to set owners addresses, onlyAdmin modifier applied
     */
    function addAdmin(address userAddress) public onlyAdmin {
        require(!admins[userAddress]);
        admins[userAddress] = true;
    }
}

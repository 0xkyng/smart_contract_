// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenA is ERC20 {
    address public tokenOwner;
    uint256 amount = 500 * 1e18;

    constructor() ERC20("TokenA", "TOK") {
        tokenOwner = msg.sender;
        _mint(tokenOwner, amount);
    }
}
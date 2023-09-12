// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenB is ERC20 {
    address public tokenBOwner;
    uint256 amount = 300 * 1e18;

    constructor() ERC20("TokenB", "TOK") {
        tokenBOwner = msg.sender;
        _mint(tokenBOwner, amount);
    }
}
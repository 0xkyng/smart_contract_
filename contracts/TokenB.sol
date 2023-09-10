// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract TokenB is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 300 tokens to msg.sender
        _mint(msg.sender, 300 * 1e18);
    }
}
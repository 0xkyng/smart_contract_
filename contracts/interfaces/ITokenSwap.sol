// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

interface ITokenSwap {
    function addLiquidity(uint256 _amountA, uint256 _amountB) external;
    function removeLiquidity(uint _amountA, uint _amountB) external;
    function swapAforB(uint _amountA) external;
    function swapBforA(uint _amountB) external;
}


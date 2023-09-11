// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    struct LiquidityProvider {
        uint amountA;
        uint amountB;
    }

    mapping (address => LiquidityProvider) liquidityProvider;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        (tokenB).transferFrom(msg.sender, address(this), _amountB);
        reserveA += _amountA;
        reserveB += _amountB;
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.amountA += _amountA;
        provider.amountB += _amountB;
        
    }

    function removeLiquidity(uint _amountA, uint _amountB) external {
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        require(provider.amountA >= _amountA && provider.amountB >= _amountB, "Insufficient liquidity balance");
        tokenA.transfer(msg.sender, _amountA);
        tokenB.transfer(msg.sender, _amountB);

        reserveA -= _amountA;
        reserveB -= _amountB;

        liquidityProvider[msg.sender].amountA -= _amountA;
        liquidityProvider[msg.sender].amountB -= _amountB; 
    }

    function swapAforB(uint _amountA) external {
        uint256 constantK = reserveA * reserveB;

        uint256 amountB = (constantK * _amountA) / ((reserveA + _amountA) * reserveB);

        require(reserveB >= amountB, "Not enough TokenA in the liquidity pool");

        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transfer(msg.sender, amountB);

        reserveA += _amountA;
        reserveB -= amountB;
    }

    function swapBforA(uint _amountB) external {
        uint256 constantK = reserveA * reserveB;
        uint amountA = (constantK * _amountB) / ((reserveB + _amountB) * reserveA);
        require(reserveA >= amountA, "Not enough TokenB in the liquidity pool");

    
        tokenB.transferFrom(msg.sender, address(this), _amountB);
        tokenA.transfer(msg.sender, amountA);

        reserveB += _amountB;
        reserveA -= amountA;
    }
}
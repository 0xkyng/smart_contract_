
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract Swap {
    IERC20 tokenA;
    IERC20 tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    struct LiquidityProvider {
        uint256 amountA;
        uint256 amountB;
    }

    mapping(address => LiquidityProvider) liquidityProvider;
    event getSwapAmount(uint amount,bool success);
    constructor(
        address _tokenA,
        address _tokenB
    ) {
        tokenA = IERC20(_tokenA);

        tokenB = IERC20(_tokenB);
    }

     function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);

        reserveA += _amountA;
        reserveB += _amountB;

        liquidityProvider[msg.sender].amountA += _amountA;
        liquidityProvider[msg.sender].amountB += _amountB;
    }


    function removeLiquidity(uint256 _amountA, uint256 _amountB) external {
        LiquidityProvider storage provider = liquidityProvider[msg.sender];

        require(provider.amountA >= _amountA && provider.amountB >= _amountB,
            "Insufficient liquidity balance");
        tokenA.transfer(msg.sender, _amountA);
        tokenB.transfer(msg.sender, _amountB);

        reserveA -= _amountA;
        reserveB -= _amountB;

        liquidityProvider[msg.sender].amountA -= _amountA;
        liquidityProvider[msg.sender].amountB -= _amountB;
    }

    function swapAforB(uint256 _amountA) external {
        require(
            tokenA.allowance(msg.sender, address(this)) >= _amountA,
            "Not enough TokenA in the liquidity pool"
        );
        
        tokenA.transferFrom(msg.sender, address(this), _amountA);

    
        uint tokenB_ = calcAforB(_amountA);
        bool success = tokenB.transfer(msg.sender, tokenB_);
        require(success,"didnt transfer");
        emit getSwapAmount(_amountA,success);
        reserveA += _amountA;
        reserveB -= tokenB_;
    }

    function swapBforA(uint256 _amountB) external {
        require(
            tokenB.allowance(msg.sender, address(this)) >= _amountB,
            "Not enough tokenA"
        );
        
        tokenB.transferFrom(msg.sender, address(this), _amountB);

        
        uint tokenA_ = calcBforA(_amountB);
        bool success = tokenA.transfer(msg.sender, tokenA_);
        require(success,"didnt transfer");
        emit getSwapAmount(_amountB,success);

        reserveB += _amountB;
        reserveA -= tokenA_;
    }

    function calcAforB(
        uint _amountA
    ) internal view returns (uint amountB_out) {
        uint constantK = reserveA * reserveB;
        uint totalA = reserveA + _amountA;
        uint constantK_over_totalA = constantK / totalA;

        amountB_out = reserveB - constantK_over_totalA;
    }

    function calcBforA(
        uint _amountB
    ) internal view returns (uint amountA_Out) {
        uint constantK = reserveA * reserveB;
        uint totalB = reserveB + _amountB;
        uint constantK_over_totalA = constantK / totalB;

        amountA_Out = reserveB - constantK_over_totalA;
    }

}
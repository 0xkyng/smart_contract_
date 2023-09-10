pragma solidity >=0.5.19;

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

    constructor(IERC20 _tokenA, IERC20 _tokenB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        IERC20(tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), _amountB);
        reserveA += _amountA;
        reserveB += _amountB;
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.amountA += _amountA;
        provider.amountB += _amountB;
        
    }

    function removeLiquidity(uint _amountA, uint _amountB) external {
        require(reserveA >= _amountA, "Not enough TokenA in the liquidity pool");
        require(reserveB >= _amountB, "Not enough TokenB in the liquidity pool");

        tokenA.transfer(msg.sender, _amountA);
        tokenB.transfer(msg.sender, _amountB);

        reserveA -= _amountA;
        reserveB -= _amountB;
    }

    function swapAforB(uint _amountA) external {
        require(reserveA >= _amountA, "Not enough TokenA in the liquidity pool");

        uint _amountB = (_amountA * reserveB) / reserveA;

        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transfer(msg.sender, _amountB);

        reserveA += _amountA;
        reserveB -= _amountB;
    }

    function swapBforA(uint _amountB) external {
        require(reserveB >= _amountB, "Not enough TokenB in the liquidity pool");

        uint _amountA = (_amountB * reserveA) / reserveB;

        tokenB.transferFrom(msg.sender, address(this), _amountB);
        tokenA.transfer(msg.sender, _amountA);

        reserveB += _amountB;
        reserveA -= _amountA;
    }
}
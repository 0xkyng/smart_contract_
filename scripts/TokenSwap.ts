import { ethers, network } from "hardhat";


async function main() {
    const tokenA = "0xbBb6EF7f4A89F2ceFbE3747bDFd8bC73af3837a7"
    const tokenB = "0xb41dC16758C7A432100b71aee49220d4f579933d"
    const tokenSwap = "0xB3bdC44d81c2Ab870804fbC6Db73a26AE12F1272"

    const[signer] = await ethers.getSigners();

    let contractA = await ethers.getContractAt("IERC20", tokenA)
    let contractB = await ethers.getContractAt("IERC20", tokenB)
    const swap = await ethers.getContractAt("Swap", tokenSwap)

    const tokenApproval = ethers.parseEther("10000000");
    console.log(tokenApproval)


    // approve contractA and ContractB to spend tokens
    await contractA.connect(signer).approve(swap, tokenApproval)
    await contractB.connect(signer).approve(swap, tokenApproval)
    console. log(await contractA.allowance(signer.address, swap))



    const amountA = ethers.parseEther("100")
    const amountB = ethers.parseEther("100")

    
    const swapA = ethers.parseEther("30")
    const SwapB = ethers.parseEther("70")

    await swap.connect(signer).addLiquidity(amountA, amountB)
    console.log("Liquidity added");

     await swap.connect(signer).swapAforB(swapA)
    console.log(`balance of tokenB signer after swap: ${await contractA.balanceOf(signer)}`);

    await swap.connect(signer).swapBforA(SwapB);
    console.log(`balance of tokenA signer after swap: ${await contractA.balanceOf(signer)}`);

    await swap.connect(signer).removeLiquidity(amountA, amountB);
    console.log("Liquidity removed successfully");

    console.log(`contract balance of tokenA after liquidity removed: ${ethers.formatEther(await contractA.balanceOf(swap))}`);
    console.log(`contract balance of tokenB after liquidity removed: ${ethers.formatEther(await contractB.balanceOf(swap))}`);
 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
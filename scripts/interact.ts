import { ethers, network } from "hardhat";


async function main() {
    const tokenA = "0xefD273EB55B2218d5688f556F10649e2657d0864"
    const tokenB = "0xE04c7166Da449334C3Ec97F9b9AC414470C8070e"
    const tokenSwap = "0x3e8A7d591BDe133a0aC6f959a7bceEEa5E9E006A"

    const signer ="0x9cDF5ce3c9Ea71ECC8fb7C3A17ed7B6c74F9C5F0"

    let contractA = await ethers.getContractAt("IERC", tokenA)
    let contractB = await ethers.getContractAt("IERC", tokenB)
    const swap = await ethers.getContractAt("ITokenSwap", tokenSwap)

    const tokenApproval = ethers.parseEther("100");
    console.log(tokenApproval)


    const impersonatedSiger = await ethers.getImpersonatedSigner(signer);

    //@ts-ignore
    await network.provider.send('hardhat_setBalance', [
        signer,
        '0x6342FD14ED9ACF95F0000',
    ])

    // approve contractA and ContractB to spend tokens
    await contractA.connect(impersonatedSiger).approve(swap, tokenApproval)
    await contractB.connect(impersonatedSiger).approve(swap, tokenApproval)
    console. log(await contractA.allowance(impersonatedSiger.address, swap))



    const amountA = ethers.parseEther("100")
    const amountB = ethers.parseEther("100")

    
    const swapA = ethers.parseEther("30")
    const SwapB = ethers.parseEther("70")

    await swap.connect(impersonatedSiger).addLiquidity(amountA, amountB)
    console.log("Liquidity added");

    const swa = await swap.connect(impersonatedSiger).swapAforB(swapA)
    console.log(swa)
    console.log("Successfully swapped tokenA for tokenB")
    console.log(`balance of tokenB signer after swap: ${await contractB.balanceOf(signer)}`);

    await swap.connect(impersonatedSiger).swapBforA(SwapB);
    //console.log(`balance of tokenA signer after swap: ${await contractA.balanceOf(signer)}`);

    await swap.connect(impersonatedSiger).removeLiquidity(amountA, amountB);
    console.log("Liquidity removed successfully");

    //console.log(`contract balance of tokenA after liquidity removed: ${ethers.formatEther(await contractA.balanceOf(swap))}`);
    //console.log(`contract balance of tokenB after liquidity removed: ${ethers.formatEther(await contractB.balanceOf(swap))}`);
 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
import { ethers, network } from "hardhat";


async function main() {
    const tokenA = "0x4957E9f1E59dCcC5ad9C9Dc3C061b66AED177a24"
    const tokenB = "0x3608be44290f98C46Fd1e793B1B8563EF9192d12"
    const tokenSwap = "0xC2019D5De22A4C0dBEEa86a47916F02e8F0c89D0"

    const signer ="0x9cDF5ce3c9Ea71ECC8fb7C3A17ed7B6c74F9C5F0"

    let contractA = await ethers.getContractAt("ITokenA", tokenA)
    let contractB = await ethers.getContractAt("ITokenB", tokenB)
    const swap = await ethers.getContractAt("ITokenSwap", tokenSwap)

    const tokenApproval = ethers.parseEther("10000000000000000000");


    const impersonatedSiger = await ethers.getImpersonatedSigner(signer);

    //@ts-ignore
    await network.provider.send('hardhat_setBalance', [
        signer,
        '0x6342FD14ED9ACF95F0000',
    ])

    // approve contractA and ContractB to spend tokens
    await contractA.connect(impersonatedSiger).approve(swap, tokenApproval)
    await contractB.connect(impersonatedSiger).approve(swap, tokenApproval)



    const amountA = ethers.parseEther("70")
    const amountB = ethers.parseEther("100")

    
    const swapA = ethers.parseEther("30")
    const SwapB = ethers.parseEther("70")

    await swap.connect(impersonatedSiger).addLiquidity(amountA, amountB)
    console.log("Liquidity added");

    await swap.connect(impersonatedSiger).swapAforB(swapA)
    console.log(`balance of tokenB signer after swap: ${await contractB.balanceOf(signer)}`);

    await swap.connect(impersonatedSiger).swapBforA(swapA);
    console.log(`balance of tokenA signer after swap: ${await contractA.balanceOf(signer)}`);

    await swap.connect(impersonatedSiger).removeLiquidity(amountA, amountB);
    console.log("Liquidity removed successfully");

    console.log(`contract balance of tokenA after liquidity removed: ${ethers.formatEther(await contractA.balanceOf(swap))}`);
    console.log(`contract balance of tokenB after liquidity removed: ${ethers.formatEther(await contractB.balanceOf(swap))}`);
 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
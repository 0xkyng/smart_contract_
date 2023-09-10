import { ethers, network } from "hardhat";


async function main() {
    const tokenA = "0xa61F043662002F9F6D2891F3120D9faA4672618B"
    const tokenB = "0x4A2BB47948CD384F088C14489d880f60dDA6D53e"
    const tokenSwap = "0xd31c46e577DEc42B691B6BC2De7F2D5c202102bC"

    const signer ="0x9cDF5ce3c9Ea71ECC8fb7C3A17ed7B6c74F9C5F0"

    let contractA = await ethers.getContractAt("ITokenA", tokenA)
    let contractB = await ethers.getContractAt("ITokenB", tokenB)
    const swap = await ethers.getContractAt("ITokenSwap", tokenSwap)

    const unlimitedApprovalTokenA = ethers.parseEther("100");
    const unlimitedApprovalTokenB = ethers.parseEther("300")

    const impersonatedSigner = await ethers.getImpersonatedSigner(signer)

    //@ts-ignore
    await network.provider.send('hardhat_setBalance', [
        signer,
        '0x6342FD14ED9ACF95F0000',
    ])

    // approve contractA and ContractB to spend tokens
    await contractA.connect(impersonatedSigner).approve(swap, unlimitedApprovalTokenA)
    await contractB.connect(impersonatedSigner).approve(swap, unlimitedApprovalTokenB)


    const amountA = ethers.parseEther("70")
    const amountB = ethers.parseEther("100")

    
    const swapA = ethers.parseEther("30")
    const SwapB = ethers.parseEther("70")

    await swap.connect(impersonatedSigner).addLiquidity(amountA, amountB)
    console.log("Liquidity added");

    await swap.connect(impersonatedSigner).swapAforB(swapA)
    console.log(`balance of tokenB signer after swap: ${await contractB.balanceOf(signer)}`);

    await swap.connect(impersonatedSigner).swapBforA(SwapB)
    console.log(`balance of tokenA signer after swap: ${await contractA.balanceOf(signer)}`);

    await swap.connect(impersonatedSigner).removeLiquidity(amountA, amountB)  
 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
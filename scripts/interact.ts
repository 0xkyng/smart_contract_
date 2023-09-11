import { ethers, network } from "hardhat";


async function main() {
    const tokenA = "0x9d2a9ADFbE03Bf043dc806e4B79b34e3132b6C08"
    const tokenB = "0x7de1e6ae6d54F747CaCF92957954c306DCeABfd1"
    const tokenSwap = "0x1c5f9308aa0ceeEf9646f7baD0421239727567a4"

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

import { ethers } from "hardhat";

async function main() {
    const tokenA = "0xefD273EB55B2218d5688f556F10649e2657d0864"
    const tokenB = "0xE04c7166Da449334C3Ec97F9b9AC414470C8070e"
    
  const tokenSwap = await ethers.deployContract("Swap", [tokenA, tokenB], {
  });

  await tokenSwap.waitForDeployment();
  console.log(`Deployed at ${tokenSwap.target}`)


 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Tokenswap was deployed at: 0xe2E5031Ab0427f9A832f8f56da7d98eF826235E8



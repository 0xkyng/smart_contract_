
import { ethers } from "hardhat";

async function main() {
    const tokenA = "0xa61F043662002F9F6D2891F3120D9faA4672618B"
    const tokenB = "0x4A2BB47948CD384F088C14489d880f60dDA6D53e"
    
  const tokenSwap = await ethers.deployContract("TokenSwap", [tokenA, tokenB], {
  });

  await tokenSwap.waitForDeployment();
  console.log(`Deployed at ${tokenSwap.target}`)


 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Tokenswap was deployed at: 0xd31c46e577DEc42B691B6BC2De7F2D5c202102bC


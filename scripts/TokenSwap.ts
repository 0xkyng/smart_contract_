import { ethers } from "hardhat";
import { TokenB } from "../typechain-types";

async function main() {
    const tokenA = "0x8178831cca0835807f3C9D020776d0a20f28e8b2"
    const tokenB = "0x2c5ac3e6897A02F40bCbBD95aBE949d76ed94748"
    
  const tokenSwap = await ethers.deployContract("TokenSwap", [tokenA, tokenB], {
  });

  await tokenSwap.waitForDeployment();

  let connetTokenA = await ethers.getContractAt("ITokenA", "TokenA")
  let connetTokenB = await ethers.getContractAt("ITokenB", "TokenB")

  console.log(`Deployed at ${tokenSwap.target}`)


 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Tokenswap was deployed at: 0x4f74F84a027D9C93A88d8916B9CE78f0Ae057411

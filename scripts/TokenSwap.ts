import { ethers } from "hardhat";
import { TokenB } from "../typechain-types";

async function main() {
    const tokenA = "0x8178831cca0835807f3C9D020776d0a20f28e8b2"
    const tokenB = "0x2c5ac3e6897A02F40bCbBD95aBE949d76ed94748"
    
  const tokenSwap = await ethers.deployContract("TokenSwap", [tokenA, tokenB], {
  });

  await tokenSwap.waitForDeployment();
  console.log(`Deployed at ${tokenSwap.target}`)

  let amountA = ethers.getUint("50")
  let amountB = ethers.getUint("200")

  let contractA = await ethers.getContractAt("ITokenA", "TokenA")
  const signTokenA = await ethers.getImpersonatedSigner(tokenA)
  await contractA.connect(signTokenA).approve(tokenSwap, amountA)

  let contractB = await ethers.getContractAt("TokenB", "TokenB")
  const signTokenB = await ethers.getImpersonatedSigner(tokenB)
  await contractB.connect(signTokenB).approve(tokenSwap, amountB)
     

  await tokenSwap.connect(signTokenA).addLiquidity(amountA, amountB)

 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Tokenswap was deployed at: 0x4f74F84a027D9C93A88d8916B9CE78f0Ae057411

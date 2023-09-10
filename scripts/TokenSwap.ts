import { ethers } from "hardhat";
import { TokenB } from "../typechain-types";

async function main() {
    const tokenA = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const tokenB = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    
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
     

  const swapAforB = await tokenSwap.connect(signTokenA).addLiquidity(amountA, amountB)

  const swapBforA = await tokenSwap.connect(signTokenB).addLiquidity(amountB, amountA)

 }

 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Tokenswap was deployed at: 0x4f74F84a027D9C93A88d8916B9CE78f0Ae057411

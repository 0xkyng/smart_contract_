import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners()
    
  const tokenA = await ethers.deployContract("TokenA", ["TokenA", "TKA"], {
  });

  await tokenA.waitForDeployment();

  console.log(` TokenA is Deployed at ${tokenA.target}`)


 }

 // Deployed at: 0x4957E9f1E59dCcC5ad9C9Dc3C061b66AED177a24

 // We recommend this pattern to be able to use async/await everywhere
 // and properly handle errors.
 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

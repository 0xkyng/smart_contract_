import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners()
    
  const tokenA = await ethers.deployContract("TokenA", ["TokenA", "TKA"], {
  });

  await tokenA.waitForDeployment();

  console.log(`Deployed at ${tokenA.target}`)


 }

 // Deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3

 // We recommend this pattern to be able to use async/await everywhere
 // and properly handle errors.
 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

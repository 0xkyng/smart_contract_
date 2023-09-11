import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners()
    
  const tokenA = await ethers.deployContract("TokenA", [], {
  });

  await tokenA.waitForDeployment();

  console.log(` TokenA is Deployed at ${tokenA.target}`)


 }

 // Deployed at: 0xa61F043662002F9F6D2891F3120D9faA4672618B

 // We recommend this pattern to be able to use async/await everywhere
 // and properly handle errors.
 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

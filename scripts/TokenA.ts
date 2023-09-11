import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners()
    
  const tokenA = await ethers.deployContract("TokenA", ["TokenA", "TKA"], {
  });

  await tokenA.waitForDeployment();

  console.log(` TokenA is Deployed at ${tokenA.target}`)


 }

 // Deployed at: 0x9d2a9ADFbE03Bf043dc806e4B79b34e3132b6C08

 // We recommend this pattern to be able to use async/await everywhere
 // and properly handle errors.
 main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

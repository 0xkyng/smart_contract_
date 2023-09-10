import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners()
    


  const tokenA = await ethers.deployContract("TokenA", ["TokenA", "TKA"], {
  });

  await tokenA.waitForDeployment();

  console.log(`Deployed at${tokenA.target}`)


}

// Deployed at: 0x8178831cca0835807f3C9D020776d0a20f28e8b2

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

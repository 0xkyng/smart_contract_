import { ethers } from "hardhat"

async function main() {
    const [signer] = await ethers.getSigners()

    const tokenB = await ethers.deployContract("TokenB", [])

    await tokenB.waitForDeployment()

    console.log(`TokenB was depolyed at ${tokenB.target}`)
}


    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
})

// TpkenB was deployed at: 0x4A2BB47948CD384F088C14489d880f60dDA6D53e
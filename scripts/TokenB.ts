import { ethers } from "hardhat"

async function main() {
    const [signer] = await ethers.getSigners()

    const tokenB = await ethers.deployContract("TokenB", ["TokenB", "TKB"])

    await tokenB.waitForDeployment()

    console.log(`TokenB was depolyed at ${tokenB.target}`)
}


    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
})

// TpkenB was deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
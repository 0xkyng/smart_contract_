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

// TpkenB was deployed at: 0x7de1e6ae6d54F747CaCF92957954c306DCeABfd1
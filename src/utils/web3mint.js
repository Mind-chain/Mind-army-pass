// import contract from '../contracts/bithuabi.json';
// import { ethers } from 'ethers';
// import { isMetaMaskInstalled, ethereum } from '../config';

// // Replace with your actual contract address
// const contractAddress = "0x9837eC39273b0E07BBf8de9E7B56F99AB5D12528";

// export const mintNFT = async () => {
//     if (isMetaMaskInstalled()) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const mindPassContract = new ethers.Contract(contractAddress, contract.abi, signer); // Define 'mindPassContract' here

//         try {
//             // Check if the user has already minted an NFT
//             const userAddress = ethereum.selectedAddress;
//             const userTokens = await mindPassContract.tokensOfOwner(userAddress);

//             if (userTokens.length > 0) {
//                 throw new Error("You have already minted an NFT. Only one mint per address is allowed.");
//             }

//             // Call the `mintPass` function on the contract with the fixed price of 5 ether
//             const mintTx = await mindPassContract.mintPass({ value: ethers.utils.parseEther("5.0") });

//             // Wait for the transaction to be mined
//             await mintTx.wait();

//             return mintTx.hash;
//         } catch (error) {
//             console.error("Minting failed:", error);
//             return null;
//         }
//     }
// };

import contract from '../contracts/bithuabi.json';
import { ethers } from 'ethers';

// Check if MetaMask is installed
const isMetaMaskInstalled = () => {
  return typeof window.ethereum !== 'undefined';
};

export const mintNFT = async () => {
  try {
    if (isMetaMaskInstalled()) {
      // Request user account access if not already granted
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Replace this with the actual contract address
      const contractAddress = "0x7615d127A64a7A14270D99f75B33BbD6a7c8B877";

      // Create a contract instance
      const mindPassContract = new ethers.Contract(contractAddress, contract.abi, signer);

      // Your minting logic here
      const userAddress = await signer.getAddress();
      const userTokens = await mindPassContract.tokensOfOwner(userAddress);

      if (userTokens.length > 0) {
        throw new Error("You have already minted an NFT. Only one mint per address is allowed.");
      }

      const mintTx = await mindPassContract.mintPass({ value: ethers.utils.parseEther("5.0") });

      // Wait for the transaction to be mined
      await mintTx.wait();

      return mintTx.hash;
    } else {
      console.error("MetaMask is not installed.");
      return null;
    }
  } catch (error) {
    console.error("Minting failed:", error);
    return null;
  }
};

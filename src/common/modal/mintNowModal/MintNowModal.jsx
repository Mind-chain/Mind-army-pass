import React, { useState, useEffect } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/mint-img.png";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { ethers } from "ethers";
import contractAbi from "../../../../src/contracts/mindpass.json"; 

const MintNowModal = () => {
  const [message, setMessage] = useState("");
  const { mintModalHandle } = useModal();
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = "0x7615d127A64a7A14270D99f75B33BbD6a7c8B877";

  useEffect(() => {
    if (window.ethereum) {
      const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethereumProvider);
      const ethereumSigner = ethereumProvider.getSigner();
      setSigner(ethereumSigner);
      const nftContract = new ethers.Contract(contractAddress, contractAbi, ethereumSigner);
      setContract(nftContract);
    }
  }, []);

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethereumProvider);
      const ethereumSigner = ethereumProvider.getSigner();
      setSigner(ethereumSigner);
      const nftContract = new ethers.Contract(contractAddress, contractAbi, ethereumSigner);
      setContract(nftContract);
    } catch (error) {
      console.error(error);
    }
  };

  const mintNFT = async () => {
    try {
      if (!signer || !contract) {
        setMessage("Please connect to MetaMask.");
        return;
      }

      const isSaleActive = await contract.saleIsActive();
      if (!isSaleActive) {
        setMessage("Sale is not active.");
        return;
      }

      const tx = await contract.mintPass({ value: ethers.utils.parseEther("5.0") });
      await tx.wait();

      setMessage("Minted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Minting failed.");
    }
  };

  const totalNFTs = 9977;

  return (
    <MintModalStyleWrapper className="modal_overlay">
      <div className="mint_modal_box">
        <div className="mint_modal_content">
          <div className="modal_header">
            <h2>Collect YOUR NFT before the end</h2>
            <button onClick={mintModalHandle}>
              <FiX />
            </button>
          </div>
          <div className="modal_body text-center">
            <div className="mint_img">
              <img src={mintImg} alt="bithu nft mint" />
            </div>
            <div className="mint_count_list">
              <ul>
               <li>
               { /*<h5>Remaining</h5>
                  <h5>
                    {totalNFTs}/<span>{totalNFTs}</span>
  </h5>*/}
                </li>
                <li>
                  <h5>Price</h5>
                  <h5>0.03 ETH</h5>
                </li>
                <li>
                  <h5>Quantity</h5>
                  <h5>1</h5>
                </li>
              </ul>
            </div>
            {message && <p>{message}</p>}
            <div className="modal_mint_btn">
              {!signer ? (
                <Button lg variant="mint" onClick={connectToMetaMask}>
                  Connect to MetaMask
                </Button>
              ) : (
                <Button lg variant="mint" onClick={mintNFT}>
                  Mint Now
                </Button>
              )}
            </div>
          </div>

          <div className="modal_bottom_shape_wrap">
            <span className="modal_bottom_shape shape_left">
              <img src={hoverShape} alt="bithu nft hover shape" />
            </span>
            <span className="modal_bottom_shape shape_right">
              <img src={hoverShape} alt="bithu nft hover shape" />
            </span>
          </div>
        </div>
      </div>
    </MintModalStyleWrapper>
  );
};

export default MintNowModal;


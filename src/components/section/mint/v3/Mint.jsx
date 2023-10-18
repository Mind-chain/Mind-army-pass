import CountdownTimer from "react-component-countdown-timer";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import MintStyleWrapper from "./Mint.style";

import checkIcon from "../../../../assets/images/icon/mint-right-text-icon.svg";
import data from "../../../../assets/data/mintItems";

import { mintNFT } from '../../../../utils/web3mint'; // Use mintNFT instead of mint
import { connectAccount, isMetaMaskInstalled } from '../../../../config.js';
import { toast } from 'react-toastify';

const Mint = () => {
  const counterSettings = {
    count: 5432560,
    showTitle: true,
    size: 40,
    labelSize: 24,
    backgroundColor: "transparent",
    color: "#fff",
    dayTitle: "D",
    hourTitle: "H",
    minuteTitle: "M",
    secondTitle: "S",
    id: "countdownwrap",
  };

  const handleMint = async (amount) => { // Changed the variable name to 'amount'
    if (!isMetaMaskInstalled()) {
      toast.error('Please install MetaMask extension!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let acc = await connectAccount();
      if (acc.length < 1) {
        toast.error('Please connect your wallet!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        let amnt = amount + 1;
        let txn = await mintNFT(amnt); // Use mintNFT instead of mint
        if (txn) { // Check if txn is not null
          toast.success('Mint successful!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  }

  return (
    <MintStyleWrapper>
      <div className="container">
        <div className="mint_header">
          <div className="row align-items-end mint_header_row">
            <div className="col-md-4">
              <h4 className="text-uppercase counter_title">
                Public Mint ends in
              </h4>
              <CountdownTimer {...counterSettings} />
            </div>
            <div className="col-md-4 text-center">
              <div className="mint_counter">
                <Counter end={5555} duration={5555} /> {/* Updated the end value */}
                <span> / 5555</span>
              </div>
            </div>
            <div className="col-md-4">
              <h4 className="sale_status text-right">
                WHITELIST: SOLDOUT
                <span>
                  <img src={checkIcon} alt="icon" />
                </span>
              </h4>
            </div>
          </div>
        </div>

        <div className="mint_items">
          <div className="row mint_items_row">
            {data?.map((item, idx) => (
              <div key={idx} className="col-md-4">
                <div className="mint_item_card">
                  <span className="mint_offer_tag"> {item.featuredText} </span>
                  <div className="mint_thumb">
                    <img src={item.thumb} alt="mint thumb" />
                  </div>

                  <div className="item_content">
                    <h4>{item.title}</h4>
                    <span className="access_text">{item.accessText}</span>
                    <span>Unit Price: {item.unitPrice}</span>
                    <span>Total: {item.totalPrice}</span>
                  </div>

                  <Button lg variant="mint" onClick={() => handleMint(idx)}>
                    {item.btnText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MintStyleWrapper>
  );
};

export default Mint;

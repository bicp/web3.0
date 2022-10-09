import { useState, useEffect } from "react";
import "./App.css";
import StartMinting from "./components/StartMinting";
import InProgressMinting from "./components/InProgressMinting";
import CompletedMinting from "./components/CompletedMinting";
import Header from "./components/Header";
import bgVideo from "./assets/backgroundVideo.mp4";
import nftImage from "./assets/NFTImage.png";
import { ethers } from "ethers";
import abi from "./manual/abi";

// Step 1: Run the app

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [supply, setSupply] = useState(0);
  const [hash, setHash] = useState();

  const mint = async () => {
    // Step 6: Write the mint function
    const payload = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract.safeMint(payload);
    console.log(transaction.hash, "HASH");
    setHash(transaction.hash);
    // Step 9: Set the variables for progress and completed
    setInProgress(true);
    await transaction.wait();
    setInProgress(false);
    setCompleted(true);
  };

  const getTotalSupply = async () => {
    // Step 5: Contract => getTotalSupply()
    const totalSupply = await contract.totalSupply();
    setSupply(totalSupply.toNumber());
  };

  // Step 5: Contract => getTotalSupply()

  const login = async () => {
    // Step 2: Connect wallet (check Metamask + accounts)
    // Step 4: Wire up contract (provider, signer, NFTContract)
    if (typeof window.ethereum !== "undefined") {
      console.log("Yayy Metamask is installed");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const walletAccount = accounts[0];
      console.log(walletAccount, "🦊 Metamask account!");
      setAccount(walletAccount);

      const contactAddress = "0xd0635a371cabb4d3d4b1dc57762a1f034264697c";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(walletAccount);

      let NFTContract = new ethers.Contract(contactAddress, abi, signer);
      console.log(NFTContract);
      setContract(NFTContract);
    }
  };

  const getState = () => {
    if (inProgress) {
      // Step 10: Pass in the transaction hash to InProgressMinting Component and check this component
      return <InProgressMinting hash={hash} />;
    }

    if (completed) {
      // Step 12: Check this component
      return <CompletedMinting />;
    }

    // Step 8: Pass mint as props
    return <StartMinting mint={mint} />;
  };

  useEffect(() => {
    if (contract) {
      getTotalSupply();
    }
  }, [contract]);

  return (
    <div className="pp">
      <Header />
      <div className="hero">
        <video className="bg-video" loop autoPlay muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="card">
          <div className="main">
            <div className="nft-section">
              <img className="nft-image" src={nftImage} alt="image" />
            </div>
            <div className="information">
              <div className="information-header-container">
                <h4 className="information-subheader">
                  1st Frontmania NFT collection:
                </h4>
                <h1 className="information-header">Frontmaniacs</h1>
              </div>
              <div className="information-interactions-container">
                <p> {supply} / 1000 minted </p>
                {account ? (
                  getState()
                ) : (
                  <div className="button connect" onClick={login}>
                    Connect Wallet
                  </div>
                )}
                {/* // Step 3: Render a mint button conditionally */}
                {/* // Step 7: insert getState() */}
              </div>
            </div>
          </div>
          <div className="footer">
            <h2>Mint a NFT from FRONTMANIACS now!</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

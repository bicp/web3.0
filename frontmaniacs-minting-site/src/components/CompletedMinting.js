import React from "react";

const CompletedMinting = () => {
  const viewOpenSea = () => {
    // Step 13: View your collection on Testnet OpenSea
    const url =
      "https://testnets.opensea.io/collection/frontmaniacs-a4s9ju614x";
    // Step 14: In case you DON'T SEE your collection on Testnet OpenSea
    const nftURL =
      "https://testnets.opensea.io/assets/goerli/<contractAddress>/0";
    window.open(url, "_blank");
  };

  return (
    <div className="minted-complete">
      <div>All set! You NFT has been minted.</div>
      <div className="button open-sea" onClick={viewOpenSea}>
        VIEW OPENSEA
      </div>
    </div>
  );
};

export default CompletedMinting;

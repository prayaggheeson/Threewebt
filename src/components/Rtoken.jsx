import React from "react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES } from "../contacts/addresses";

const Rtoken = () => {
  const address = useAddress();
  const { contract: rewardTokenContract } = useContract(REWARD_TOKEN_ADDRESSES);
  const { data: tokenBalance } = useTokenBalance(rewardTokenContract, address);
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f0f0",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "300px",
      margin: "0 auto",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    paragraph: {
      fontSize: "16px",
      margin: "10px 0",
    },
  };
  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.heading}>Token Name: {tokenBalance?.name}</h1>
        <p style={styles.paragraph}>
          Token Balance: {tokenBalance?.displayValue}
        </p>
        <p style={styles.paragraph}>Token Symbol: {tokenBalance?.symbol}</p>
        <p style={styles.paragraph}>Token Decimals: {tokenBalance?.decimals}</p>
      </div>
    </>
  );
};

export default Rtoken;

import React, { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import {
  STAKE_CONTRACT_ADDRESSES,
  STAKE_TOKEN_ADDRESSES,
  REWARD_TOKEN_ADDRESSES,
} from "../contacts/addresses";
import { ethers } from "ethers";

const Stake = () => {
  const address = useAddress();

  const { contract: stakeTokenContract } = useContract(
    STAKE_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    REWARD_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: stakeContract } = useContract(
    STAKE_CONTRACT_ADDRESSES,
    "custom"
  );

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, []);

  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
  }

  const containerStyle = {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const sectionStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const columnStyle = {
    flex: "1",
  margin: "0 10px",
  };

  return (
    <div style={containerStyle}>
      <h1>Earn Reward Token</h1>
      <div style={sectionStyle}>
        <div style={columnStyle}>
          <div>
            <strong>Stake Token:</strong>
          </div>
          <div>
            {loadingStakeInfo || loadingStakeTokenBalance ? (
              <p>Loading...</p>
            ) : (
              <p>
                {ethers.utils.formatEther(stakeInfo[0])}{" "}
                {stakeTokenBalance?.symbol}
              </p>
            )}
          </div>
          <div>
            <input
              type="number"
              max={stakeTokenBalance?.displayValue}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            <button
              onClick={async () => {
                await stakeTokenContract?.erc20.setAllowance(
                  STAKE_CONTRACT_ADDRESSES,
                  stakeAmount
                );
                await stakeContract.call("stake", [
                  ethers.utils.parseEther(stakeAmount),
                ]);
                resetValue();
              }}
            >
              Stake
            </button>
          </div>
        </div>
        <div style={columnStyle}>
          <div>
            <strong>Reward Token:</strong>
          </div>
          <div>
            {loadingStakeInfo || loadingRewardTokenBalance ? (
              <p>Loading...</p>
            ) : (
              <p>
                {ethers.utils.formatEther(stakeInfo[1])}{" "}
                {rewardTokenBalance?.symbol}
              </p>
            )}
          </div>
          <button
            onClick={async () => {
              await stakeContract.call("claimRewards");
              resetValue();
            }}
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stake;

"use client";

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Airdrop from "./Airdrop";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import SendTokens from "./SendTokens";
import SignMessage from "./SignMessage";

const ConnectWallet = () => {
  const [balance, setBalance] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const getBalance = async () => {
      if (!wallet.publicKey) return;
      const balance = await connection.getBalance(wallet.publicKey);
      setBalance(balance);
    };

    getBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div className="flex flex-col justify-center gap-20 pt-12">
      <div className="flex justify-center gap-12">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      <div className="flex items-center gap-12">
        <div className="border border-gray-400 rounded-xl px-10 py-20 text-xl font-medium flex flex-col gap-3">
          <div className="flex items-center gap-3">
            Public Key :{" "}
            <span className="font-normal text-gray-700">
              {wallet.publicKey?.toString()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            Balance :
            <span className="font-normal text-gray-700">
              {balance / LAMPORTS_PER_SOL} SOL
            </span>
          </div>
        </div>
        <Airdrop />
        <SendTokens />
        <SignMessage />
      </div>
    </div>
  );
};

export default ConnectWallet;

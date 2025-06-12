"use client";

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Airdrop from "./Airdrop";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const ConnectWallet = () => {
  const [balance, setBalance] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  async function getBalance() {
    if (wallet.publicKey) {
      const balanceUser = await connection.getBalance(wallet.publicKey);
      setBalance(balanceUser);
    }
  }

  getBalance();

  return (
    <div className="flex flex-col justify-center gap-20 pt-12">
      <div className="flex justify-center gap-12">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      <div className="flex items-center gap-32">
        <div className="border border-gray-400 rounded-xl px-10 py-20 text-xl font-medium flex flex-col gap-3">
          <div className="flex items-center gap-3">
            Public Key :{" "}
            <span className="font-normal text-gray-700">
              {wallet.publicKey?.toString()}
            </span>
          </div>
          <div>Show Balance : {balance}</div>
        </div>
        <Airdrop />
      </div>
    </div>
  );
};

export default ConnectWallet;

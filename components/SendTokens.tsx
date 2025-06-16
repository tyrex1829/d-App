import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useState } from "react";

const SendTokens = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [publicKeyOfReciever, setPublicKeyOfReciever] = useState("");
  const [amountToSend, setAmountToSend] = useState("");

  const sendTokens = async () => {
    if (!wallet.publicKey) return;
    if (!publicKeyOfReciever) return;

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(publicKeyOfReciever),
        lamports: Number(amountToSend) * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
    alert("Sent " + amountToSend + " SOL to " + publicKeyOfReciever);
  };

  return (
    <div className="flex flex-col gap-4 border border-gray-400 rounded-xl px-10 py-6">
      <h1 className="text-center text-2xl font-bold mb-2">Send Token</h1>
      <input
        className="border px-1 rounded py-1"
        type="text"
        placeholder="Recipient Public Key"
        value={publicKeyOfReciever}
        onChange={(e) => {
          setPublicKeyOfReciever(e.target.value);
        }}
      />
      <input
        className="border px-1 rounded py-1"
        type="text"
        placeholder="Amount"
        value={amountToSend}
        onChange={(e) => {
          setAmountToSend(e.target.value);
        }}
      />
      <button
        className="font-medium  py-2 bg-gray-600 rounded-2xl text-white hover:bg-gray-500 cursor-pointer"
        onClick={sendTokens}
      >
        Send
      </button>
    </div>
  );
};

export default SendTokens;

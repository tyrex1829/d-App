import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const Airdrop = () => {
  const [amount, setAmount] = useState(1);
  const wallet = useWallet();
  const { connection } = useConnection();

  const airdropToUser = async () => {
    if (!wallet.publicKey) {
      alert("Connect your wallet first!");
      return;
    }
    await connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    alert("sent");
  };
  return (
    <div>
      <div className="flex flex-col gap-4 border border-gray-400 rounded-xl px-10 py-6">
        <h1 className="text-center text-xl font-medium mb-3">
          Request Airdrop
        </h1>
        <input
          type="number"
          placeholder="SOL"
          value={amount}
          min={1}
          className="border border-gray-400 rounded-xl px-2 py-1"
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
        />
        <button
          onClick={airdropToUser}
          className="font-medium  py-2 bg-gray-600 rounded-2xl text-white hover:bg-gray-500 cursor-pointer"
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default Airdrop;

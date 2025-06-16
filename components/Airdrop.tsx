import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const airdropToUser = async () => {
    if (!wallet.publicKey) {
      alert("Connect your wallet first!");
      return;
    }
    await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL);
    alert("sent");
  };

  return (
    <div>
      <div className="flex flex-col gap-8 border border-gray-400 rounded-xl px-10 py-6">
        <h1 className="text-center text-2xl font-bold mb-5">Request Airdrop</h1>
        <div className="text-center text-xl font-medium mb-1.5">
          1 SOL in Devnet
        </div>
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

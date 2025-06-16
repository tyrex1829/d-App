import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { ed25519 } from "@noble/curves/ed25519";

const SignMessage = () => {
  const [message, setMessage] = useState("");
  const { publicKey, signMessage } = useWallet();

  const signMessageFn = async () => {
    if (!publicKey) return;
    if (!signMessage) return;

    const encodeMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodeMessage);

    if (!ed25519.verify(signature, encodeMessage, publicKey.toBytes())) {
      alert("Signature is not valid");
      return;
    }
    alert("Success" + ` Message sign: ${bs58.encode(signature)}`);
  };

  return (
    <div className="flex flex-col gap-8 border border-gray-400 rounded-xl px-10 py-6">
      <h1 className="text-center text-2xl font-bold mb-6">Sign Message</h1>
      <input
        className="border px-1 rounded py-1"
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="font-medium  py-2 bg-gray-600 rounded-2xl text-white hover:bg-gray-500 cursor-pointer"
        onClick={signMessageFn}
      >
        Sign
      </button>
    </div>
  );
};

export default SignMessage;

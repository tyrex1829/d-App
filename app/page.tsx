import ConnectWallet from "@/components/ConnectWallet";
import RootLayout from "../components/AppWalletProvider";

export default function Home() {
  return (
    <div className="flex flex-col gap-14 px-36 h-screen">
      <RootLayout>
        <ConnectWallet />
      </RootLayout>
    </div>
  );
}

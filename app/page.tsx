import NavBar from "../components/NavBar";
import WalletGenerator from "../components/WalletGenerator";

export default function Home() {
  return (

  <div>
    <div>
    <NavBar />
    </div>
    <div className="flex justify-center align-middle items-center">
    <WalletGenerator/>
    </div>
  </div>  
  );
}

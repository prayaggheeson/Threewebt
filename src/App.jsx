import { ConnectWallet } from "@thirdweb-dev/react";
import Gtoken from "./components/Gtoken";
import Rtoken from "./components/Rtoken";
import Stake from "./components/Stake";

function App() {
  const containerStyle = {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    height: "100vh",
    width: "100vw",
  };

  return (
    <>
      <div style={containerStyle}>
        <ConnectWallet />
        <Gtoken />
        <Rtoken />
        <Stake />
      </div>
    </>
  );
}

export default App;

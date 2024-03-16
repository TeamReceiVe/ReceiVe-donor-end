import { useState, useEffect } from 'react';
import Connex from '@vechain/connex';
import { useSigner } from "../state/signerContext";

const useWalletConnex = () => {
  const [connex, setConnex] = useState<Connex | null>(null);
  const [vendor, setVendor] = useState<Connex.Vendor | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const { setSigner } = useSigner();

  useEffect(() => {
    const connexInstance = new Connex({
      node: 'https://testnet.veblocks.net/',
      network: 'test',
    });
    setConnex(connexInstance);
    setVendor(new Connex.Vendor('test'));
  }, []);

  const handleConnectWallet = () => {
    if (vendor) {
      vendor.sign("cert", {
        purpose: "identification",
        payload: {
          type: "text",
          content: "Connect your wallet to log in"
        }
      })
      .request()
      .then((r) => {
        setSigner(r.annex.signer);
        setWalletConnected(true);
      })
      .catch(() => {
        setSigner('User Canceled');
        setWalletConnected(false);
      });
    }
  };

  return { connex, vendor, walletConnected, handleConnectWallet };
};

export default useWalletConnex;

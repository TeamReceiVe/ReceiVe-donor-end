import { DAppKit } from "@vechain/dapp-kit";
import type { WalletSource } from '@vechain/dapp-kit';



wallet.setSource('veworld');
//import { Connex } from '@vechain/connex'
const {thor, vendor, wallet} = new DAppKit({
  // Required - The URL of the node to connect to
  nodeUrl: "https://sync-testnet.vechain.org/", 
  // Optional - "main" | "test" | Connex.Thor.Block
  genesis: "test", 
  // Optional - Wallet connect options
  walletConnectOptions: walletConnectOptions, 
  // Optional - Defaults to false. If true, account and source will be persisted in local storage
  usePersistence: true, 
  // Optional - Use the first available wallet
  useFirstDetectedSource: false,
  // Optional - Log Level - To debug the library
  logLevel: "DEBUG",
  // OPTIONAL: every wallet has a connection certificate, but wallet connect doesn't connect with a certificate, it uses a session; if required, with this option, we will force the user to sign a certificate after he finishes the connection with wallet connect
  requireCertificate=false,
});

// type WalletSource = 'wallet-connect' | 'veworld' | 'sync2' | 'sync';
const mySource: WalletSource = 'sync2';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets,RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet,polygon,optimism,arbitrum,zora,goerli,bscTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';

const { chains, publicClient , webSocketPublicClient } = configureChains(
  [bscTestnet],
  [
    infuraProvider({apiKey:"b532fc5965f740dc85fd3d23efdfeb78"}),
    alchemyProvider({ apiKey: "5_QtXdyH5_CjzDslHCDR9qcsYAKdOmjp" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'CoinBazan',
  projectId: '9052d18aa0b95f4fdbeb4984a7979a4f',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
            <App/>
        </RainbowKitProvider>
      </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

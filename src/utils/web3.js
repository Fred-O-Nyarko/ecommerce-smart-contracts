import Web3 from 'web3';

let web3;

export const initWeb3 = () =>
  new Promise(resolve => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', () => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(window.web3.ethereum);

        console.log('Injected web3 detected.'); // eslint-disable-line

        resolve(web3);
      } else {
        // Fallback to localhost if no web3 injection. We've configured this to
        // use the development console's port by default.
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
        web3 = new Web3(provider);

        console.log('No web3 instance injected, using Local web3.'); // eslint-disable-line

        resolve(web3);
      }
    });
  });

// export const initWeb3 = async () => {
//   if (window.ethereum) {
//     window.web3 = new Web3(ethereum);
//     try {
//         // Request account access  needed
//         await ethereum.enable();
//         // Acccounts now exposed
//         web3.eth.sendTransaction({/* ... */});
//     } catch (error) {
//         // User denied account access...
//     }
// }

// Non-dapp browsers...
// else {
//     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
// }
// }

if(!initWeb3){
  alert("Please install metamask to use this dApp")
}

window.addEventListener('load', async () => {
  // Modern dapp browsers...

});

export const getWeb3 = () => web3;

export const fromWei = (wei, unit) => web3?.fromWei(wei, unit);

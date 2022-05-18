import { Step } from 'react-joyride';

export const dashboardSteps = [
  {
    content: (
      <>
        <h2>Welcome to Upload My NFT!</h2>
        <p>Please connect your meta mask wallet using the "Connect Wallet" button.</p>
        <p>NOTE: The button will show your wallet address if it is already connected.</p>
      </>
    ),
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <>
        <h2>Collection Overview</h2>
        <p>Your collection statistics will show here.</p>
        <p>Total NFTs Minted shows the count of all the NFTs minted through the connected wallet address.</p>
      </>
    ),
    spotlightPadding: 20,
    target: '#collectionOverview',
  },
  {
    content: (
      <>
        <h2>NFT Distribution</h2>
        <p>Your collection statistics will show here.</p>
        <p>Total NFTs Minted shows the count of all the NFTs minted through the connected wallet address.</p>
      </>
    ),
    spotlightPadding: 20,
    target: '#nftDistribution',
    placement: 'left',
  },
  {
    content: (
      <>
        <h2>Select Collection</h2>
        <p>Select collection from this dropdown menu to see its info in the chart below.</p>
        <p>This menu will have all the collection you created using your wallet address.</p>
      </>
    ),
    spotlightPadding: 20,
    target: '#collection-select',
    placement: 'left',
  },
  {
    content: (
      <>
        <p>Click on Collections to begin collection creation process</p>
      </>
    ),
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    placement: 'right',
    target: '#sidebar-Collections',
  },
] as Step[];

export const collectionStepsInitial = [
  {
    content: (
      <>
        <h2>Collections Page!</h2>
        <p>You can view all your created collections here.</p>
        <p>NOTE: All the collections showen here will be against your currently connected wallet.</p>
      </>
    ),
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <>
        <h2>Collection Table</h2>
        <p>This table will show your collection name, symbol and address.</p>
      </>
    ),
    spotlightPadding: 20,
    target: '#collectionTable',
  },
  {
    content: (
      <>
        <h2>Create New Collection</h2>
        <p>Start by creating your first collection. Click on the Create Collection button</p>
      </>
    ),
    target: '#createCollection',
    spotlightPadding: 20,
    placement: 'auto',
    isFixed: true,
  },
] as Step[];

export const collectionStepsFinal = [
  {
    content: (
      <>
        <h2>Congratulations!</h2>
        <p>You can Have successfully created your own collection.</p>
      </>
    ),
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <>
        <h2>Collection Actions</h2>
        <p>
          This column includes manage NFT button which will redirect you to all of the NFTs for <b>this collection</b>.
        </p>
      </>
    ),
    spotlightPadding: 20,
    target: '#manageNFT-0',
    placement: 'left',
  },
] as Step[];

export const createCollectionSteps = [
  {
    content: (
      <>
        <h2>Collection Name</h2>
        <p>
          Enter collection name. Please note that you need to carefully enter the collection name. Once submitted, you
          will not be able to change it.
        </p>
      </>
    ),
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    target: '#collection-name',
    placement: 'auto',
  },
  {
    content: (
      <>
        <h2>Collection Symbol</h2>
        <p>
          Enter collection symbol. Please note that you need to carefully enter the collection name. Once submitted, you
          will not be able to change it.
        </p>
      </>
    ),
    target: '#collection-symbol',
    placement: 'auto',
  },
  {
    content: (
      <>
        <h2>Collection Royalty</h2>
        <p>The percentage added here will go into your account against transactions made on this collection.</p>
      </>
    ),
    target: '#royalty',
    placement: 'auto',
  },
  {
    content: (
      <>
        <h2>Create Collection</h2>
        <p>Click the submit button to finalize your collection.</p>
        <p>
          NOTE: This process may take some time and would require confirmation from your metamask. Once completed, you
          will be redirected to collections page.
        </p>
      </>
    ),
    target: '#submitCollection',
    placement: 'auto',
  },
] as Step[];

export const nftSteps = [
  {
    content: (
      <>
        <h2>NFTs Page</h2>
        <p>You can view all your created NFTs here.</p>
        <p>NOTE: All the NFT showen here will be against your currently connected wallet.</p>
      </>
    ),
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <>
        <h2>NFT Table</h2>
        <p>This table will show your Token ID, name, image and image address.</p>
      </>
    ),
    spotlightPadding: 20,
    target: '#nftTable',
  },
  {
    content: (
      <>
        <h2>Collection Actions</h2>
        <p>
          This column includes manage NFT button which will redirect you to all of the NFTs for <b>this collection</b>.
        </p>
      </>
    ),
    spotlightPadding: 20,
    target: '#manageNFT',
    placement: 'left',
  },
  {
    content: (
      <>
        <h2>Create NFT</h2>
        <p>You can create more NFTs by clicking on this button and following the process after that.</p>
        <p>This button will redirect you to a new page where you will have to add NFT details.</p>
      </>
    ),
    target: '#createNFT',
    spotlightPadding: 20,
    disableBeacon: true,
    placement: 'auto',
    isFixed: true,
  },
] as Step[];

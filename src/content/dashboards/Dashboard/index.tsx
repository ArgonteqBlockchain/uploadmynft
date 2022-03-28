import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Container, Typography, Grid, Button } from '@mui/material';
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CollectionOverview from './CollectionOverview';
import NFTDistribution from './NFTDistribution';

function Dashboard() {
  let helpers: StoreHelpers;

  const [tour, setTour] = useState({
    run: false,
    steps: [
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
        placement: 'right',
      },
    ] as Step[],
  });

  const handleClickHelp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setTour({
      ...tour,
      run: true,
    });
  };

  const getHelpers = (_helpers: StoreHelpers) => {
    helpers = _helpers;
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setTour({
        ...tour,
        run: false,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Joyride
        callback={handleJoyrideCallback}
        continuous={true}
        getHelpers={getHelpers}
        run={tour.run}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        steps={tour.steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <PageTitleWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h1" component="h1">
            Dashboard
          </Typography>
          <Button sx={{ marginTop: '-10px' }} variant="contained" onClick={handleClickHelp}>
            Help
          </Button>
        </div>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <div id="collectionOverview">
              <CollectionOverview />
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div id="nftDistribution">
              <NFTDistribution />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;

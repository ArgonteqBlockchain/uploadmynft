import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';
import { Grid, Container, Button, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import RecentNFT from './NFTComponents/RecentNFTs';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Collection } from 'src/models/collection';

function Nfts() {
  const location = useLocation();

  const collection: Collection = location.state as any;

  let helpers: StoreHelpers;

  const [tour, setTour] = useState({
    run: false,
    steps: [
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
              This column includes manage NFT button which will redirect you to all of the NFTs for{' '}
              <b>this collection</b>.
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
        spotlightPadding: 20,
        target: '#createNFT',
        placement: 'right',
      },
    ] as Step[],
  });

  const getHelpers = (_helpers: StoreHelpers) => {
    helpers = _helpers;
  };

  const handleClickHelp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setTour({
      ...tour,
      run: true,
    });
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
        <title>NFTS</title>
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
            {collection.name}
          </Typography>
          <Button sx={{ marginTop: '-10px' }} variant="contained" onClick={handleClickHelp}>
            Help
          </Button>
        </div>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <div id="nftTable">
              <RecentNFT />
            </div>
          </Grid>
        </Grid>
        <Link
          to={'/createnewnft'}
          state={{ state: collection }}
          style={{
            textDecoration: 'none',
          }}
        >
          <Button id="createNFT" sx={{ marginTop: 2 }} variant="contained" size="large" color="primary">
            Create New NFT
          </Button>
        </Link>
      </Container>
      <Footer />
    </>
  );
}

export default Nfts;

// Modified

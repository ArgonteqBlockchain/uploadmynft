import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';

import Footer from 'src/components/Footer';
import RecentCollections from './CollectionComponents/RecentCollections';

function Collections() {
  let helpers: StoreHelpers;

  const [tour, setTour] = useState({
    run: false,
    steps: [
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
            <h2>Create Collection</h2>
            <p>You can create more collections by clicking on this button and following the process after that.</p>
            <p>This button will redirect you to a new page where you will have to add collection details.</p>
          </>
        ),
        spotlightPadding: 20,
        target: '#createCollection',
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
        <title>Collections</title>
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
            Collections
          </Typography>
          <Button sx={{ marginTop: '-10px' }} variant="contained" onClick={handleClickHelp}>
            Help
          </Button>
        </div>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <div id="collectionTable">
              <RecentCollections />
            </div>
          </Grid>
        </Grid>
        <Button
          id="createCollection"
          sx={{ marginTop: 2 }}
          variant="contained"
          size="large"
          href="/createnewcollection"
          color="primary"
        >
          Create Collection
        </Button>
      </Container>
      <Footer />
    </>
  );
}

export default Collections;

// Modified

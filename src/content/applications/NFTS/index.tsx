import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS, StoreHelpers } from 'react-joyride';
import { Grid, Container, Button, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import RecentNFT from './NFTComponents/RecentNFTs';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Collection } from 'src/models/collection';
import { nftSteps } from 'src/constants/steps';

function Nfts() {
  const location = useLocation();

  const collection: Collection = location.state as any;

  let helpers: StoreHelpers;
  const [tour, setTour] = useState({
    run: false,
    steps: nftSteps,
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
    <div>
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
    </div>
  );
}

export default Nfts;

// Modified

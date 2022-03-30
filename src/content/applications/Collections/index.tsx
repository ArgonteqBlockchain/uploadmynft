import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Joyride, { CallBackProps, STATUS, StoreHelpers } from 'react-joyride';
import { collectionStepsInitial, collectionStepsFinal } from 'src/constants/steps';
import Footer from 'src/components/Footer';
import RecentCollections from './CollectionComponents/RecentCollections';
import useLocalStorage from 'src/hooks/useLocalStorage';

function Collections() {
  let helpers: StoreHelpers;

  const { getItem, setItem } = useLocalStorage('showOnCollection', { show: false, onCollectionCreate: false }, true);

  const [tour, setTour] = useState({
    run: getItem('show', false),
    steps: getItem('onCollectionCreate', false) ? collectionStepsFinal : collectionStepsInitial,
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
    if (status === STATUS.FINISHED) {
      if (getItem('onCollectionCreate', false)) {
        setItem('show', false);
        setItem('onCollectionCreate', false);
      }
    }
    if (status === STATUS.SKIPPED) {
      setItem('show', false);
      setItem('onCollectionCreate', false);
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

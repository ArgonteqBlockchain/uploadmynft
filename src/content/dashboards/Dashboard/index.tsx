import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { styled } from '@mui/material/styles';
import { Container, Typography, Grid, Button, Card, Box } from '@mui/material';
import Joyride, { CallBackProps, STATUS, StoreHelpers } from 'react-joyride';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CollectionOverview from './CollectionOverview';
import NFTDistribution from './NFTDistribution';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { dashboardSteps } from 'src/constants/steps';

function Dashboard() {
  let helpers: StoreHelpers;

  const { setItem } = useLocalStorage('showOnCollection', { show: false, showLeft: false }, false);
  let firstTime = true;
  if (localStorage.getItem('firstTime')) {
    firstTime = false;
    localStorage.setItem('firstTime', '{}');
  }

  const Note = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  }));

  const NoteList = styled('ul')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginTop: '20px',
      marginLeft: '20px',
      flexDirection: 'column',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '18px',
      marginLeft: '0',
      flexDirection: 'row',
    },
  }));

  const [tour, setTour] = useState({
    run: firstTime,
    steps: dashboardSteps,
  });

  const handleClickHelp = (e: React.MouseEvent<HTMLElement>) => {
    setTour({
      ...tour,
      run: true,
    });
    console.log('Setting Item');
    setItem('show', true);
    e.preventDefault();
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
    if (status === STATUS.FINISHED) {
      console.log('Completed');
      setItem('showLeft', true);
      setItem('show', true);
      localStorage.setItem('firstTime', '{}');
    }
    if (status === STATUS.SKIPPED) {
      localStorage.setItem('firstTime', '{}');
    }
    console.log(data);
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
        <Note>
          <Typography
            sx={{
              marginTop: '8px',
              marginLeft: '10px',
              marginRight: '-10px',
            }}
            variant="h4"
          >
            NOTE :
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              marginTop: '-10px',
              marginLeft: '0px',
            }}
          >
            <NoteList>
              <li
                style={{
                  marginRight: '20px',
                }}
              >
                We are NOT KYC.
              </li>
              <li
                style={{
                  marginRight: '20px',
                }}
              >
                You set your royalties percentage.
              </li>
              <li
                style={{
                  marginRight: '20px',
                }}
              >
                We mint your NFT direct to your wallet!
              </li>
            </NoteList>
          </Typography>
        </Note>
      </PageTitleWrapper>
      <Container
        sx={{
          display: 'none',
        }}
        maxWidth="xs"
      >
        <Card sx={{ p: 2.5, mb: 4 }}>
          <Box display="flex" alignItems="center">
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="h4" noWrap gutterBottom>
                NOTE
              </Typography>
              <Typography variant="subtitle2" marginTop="10px" marginLeft="5px">
                <ul>
                  <li>We are NOT KYC.</li>
                  <li>You set your royalties percentage.</li>
                  <li>We mint your NFT direct to your wallet!</li>
                </ul>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <div id="collectionOverview">
              <CollectionOverview />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
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

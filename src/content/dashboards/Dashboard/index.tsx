import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Container, Typography, Grid } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CollectionOverview from './CollectionOverview';
import NFTDistribution from './NFTDistribution';

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <Typography variant="h1" component="h1">
          Dashboard
        </Typography>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <CollectionOverview />
          </Grid>
          <Grid item xs={12} md={5}>
            <NFTDistribution />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;

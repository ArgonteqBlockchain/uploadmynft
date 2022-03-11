import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import React, { useState } from 'react';
import { Grid, Container, Button } from '@mui/material';
import Footer from 'src/components/Footer';
import RecentNFT from './NFTComponents/RecentNFTs';
import { useLocation } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { Collection } from 'src/models/collection';
import { useCollections } from 'src/hooks/useCollections';

function Nfts() {
  const location = useLocation();

  const collection: Collection = location.state as any;

  return (
    <>
      <Helmet>
        <title>NFTS</title>
      </Helmet>
      <PageTitleWrapper></PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentNFT />
          </Grid>
        </Grid>
        <Link
          to={'/createnewnft'}
          state={{ state: collection }}
          style={{
            textDecoration: 'none',
          }}
        >
          <Button sx={{ marginTop: 2 }} variant="contained" size="large" color="primary">
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

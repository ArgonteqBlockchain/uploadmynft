import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Button } from '@mui/material';
import Footer from 'src/components/Footer';
import RecentOrders from './RecentTransactions';

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper></PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
        <Button sx={{ marginTop: 2 }} variant="contained" size="large" href="/createnewcollection" color="primary">
          Create Collection
        </Button>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;

// Modified

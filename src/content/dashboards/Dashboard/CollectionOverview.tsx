import { Card, Box, Grid, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useCollectionsTokens } from 'src/hooks/useCollectionsTokens';

/**
 * @dev Get difference between two dates
 * @param {Date} date
 * @return {number}
 */
function getDateDifference(date) {
  const currentDate = new Date();
  const diffTime = Math.abs((currentDate as any) - Date.parse(date));
  const diffDaysNum = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDaysNum;
}

function getDataInLast24h(dataArr: any) {
  return dataArr.filter((data) => getDateDifference(data.createdAt) <= 1);
}

function CollectionOverview() {
  const { account } = useWeb3React();
  const { tokens, collections } = useCollectionsTokens({ collectionOwner: account });

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box display="flex" alignItems="center" pb={3}>
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="h4" noWrap gutterBottom>
                  Total Collections
                </Typography>
                <Typography variant="subtitle2" marginTop="10px" marginLeft="5px" noWrap>
                  {collections.length}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box display="flex" alignItems="center" pb={3}>
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="h4" noWrap gutterBottom>
                  Collections in Last 24h
                </Typography>
                <Typography variant="subtitle2" marginTop="10px" marginLeft="5px" noWrap>
                  {getDataInLast24h(collections).length}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box display="flex" alignItems="center" pb={3}>
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="h4" noWrap gutterBottom>
                  Total NFTs Minted
                </Typography>
                <Typography variant="subtitle2" marginTop="10px" marginLeft="5px" noWrap>
                  {tokens.length}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box display="flex" alignItems="center" pb={3}>
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="h4" noWrap gutterBottom>
                  NFT in Last 24h
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {getDataInLast24h(tokens).length}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default CollectionOverview;

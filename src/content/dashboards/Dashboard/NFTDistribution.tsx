import {
  Card,
  Box,
  CardHeader,
  Typography,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import NFTChart from './NFTChart';
import { useWeb3React } from '@web3-react/core';
import { useCollections } from 'src/hooks/useCollections';
import { useTokens } from 'src/hooks/useTokens';

const Reserved = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: #fec62d;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`,
);

const Free = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: #517ddb;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`,
);

const Sold = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: #ea3943;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`,
);

const LegendDiv = styled('div')(
  ({ theme }) => `
    display: flex;
    flex-direction: row;
  `,
);

const LegendSpan = styled('span')(
  ({ theme }) => `
    font-weight: 600;
    margin-left: 3px;
  `,
);

function NFTDistribution() {
  const { collections } = useCollections({});
  const { account } = useWeb3React();
  const [selectedCollection, setCollection] = useState({} as any);
  const { tokens } = useTokens({ collectionAddress: selectedCollection });
  const [selfMintCount, setSelfMintCount] = useState(0);
  const [mintToCount, setMintToCount] = useState(0);

  useEffect(() => {
    setMintToCount(tokens.filter((token) => token.data.to != account).length);
    setSelfMintCount(tokens.filter((token) => token.data.to == account).length);
  }, [tokens]);

  const handleChange = (event) => {
    console.log('HANDLE CHANGE', event.target);
    setCollection(event.target.value);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="NFT Distribution" />
      <FormControl
        sx={{
          marginLeft: '26px',
          width: '80%',
        }}
      >
        <InputLabel id="demo-simple-select-label">Collection</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCollection.address}
          label="Collection"
          onChange={(e) => {
            if (!!collections && collections.length > 0) handleChange(e);
          }}
        >
          {collections.map((collection) => {
            return (
              <MenuItem key={collection.address} value={collection.address}>
                {collection.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <CardContent sx={{ pt: 2 }}>
        <Box display="flex" marginLeft="10px" alignItems="center" pl={1} pb={3}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Free />
            <LegendDiv>
              Total NFTs
              <LegendSpan>{tokens.length}</LegendSpan>
            </LegendDiv>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Reserved />
            <LegendDiv>
              Self-Mint
              <LegendSpan>{selfMintCount}</LegendSpan>
            </LegendDiv>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Sold />
            <LegendDiv>
              Mint To
              <LegendSpan>{mintToCount}</LegendSpan>
            </LegendDiv>
          </Typography>
        </Box>
        <Box height={300} marginLeft="22px">
          <NFTChart
            totalNFT={tokens.length}
            inCirculation={selfMintCount}
            staked={mintToCount}
            width={300}
            height={300}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default NFTDistribution;

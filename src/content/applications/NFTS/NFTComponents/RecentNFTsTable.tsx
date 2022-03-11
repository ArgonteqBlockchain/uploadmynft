import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
} from '@mui/material';

import { useLocation } from 'react-router';
import PreviewIcon from '@mui/icons-material/Preview';
import { INFT, IToken } from 'src/models/nft';
import { Collection } from 'src/models/collection';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';

interface RecentNFTTableProps {
  className?: string;
}

/**
 * @dev takes in image link and returns hidden image hash
 * @param {string} imgLink
 * @param {number} visibleValueCount
 * @return {string}
 */
const getURL = (imgLink: string, visibleValueCount: number = 6) => {
  const str = imgLink.split('/');
  const imageHash = str[str.length - 1];
  const hiddenHash =
    imageHash.slice(0, visibleValueCount) +
    '*****' +
    imageHash.slice(imageHash.length - 1 - visibleValueCount, imageHash.length - 1);
  return hiddenHash;
};

const RecentNFTsTable: FC<RecentNFTTableProps> = () => {
  // TODO: Fetch all nfts against a collection name
  const { account, active, error } = useWeb3React();
  // const [tokens, setTokens] = useState([]);
  const [nfts, setNfts] = useState([]);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const location = useLocation();
  const collection: Collection = location.state as any;
  const title = `NFTS (${collection.name})`;

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://${collection.baseurl}`,
      responseType: 'json',
    })
      .then((res) => {
        console.log('CALL');
        if (res && res.data && res.data.length > 0) {
          setNfts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const applyPagination = (nfts: INFT[], page: number, limit: number): INFT[] => {
    return nfts.slice(page * limit, page * limit + limit);
  };

  const paginatedCollections = applyPagination(nfts, page, limit);
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Details</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCollections.map((nft) => {
              console.log(nft);
              return nft.meta ? (
                <TableRow hover key={nft.meta.name}>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {nft.tokenId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {nft.meta.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <a href={nft.meta.image} target="_blank" rel="noreferrer">
                      <div
                        style={{
                          minHeight: '140px',
                          maxHeight: '160px',
                          width: '200px',

                          marginTop: 10,
                          backgroundImage: `url(${nft.meta.image})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                        }}
                      ></div>
                    </a>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      <a
                        href={nft.meta.image}
                        target="_blank"
                        style={{
                          textDecoration: 'none',
                          letterSpacing: 1,
                        }}
                        rel="noreferrer"
                      >
                        {getURL(nft.meta.image)}
                      </a>
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="left">
                    <Tooltip title="Show Meta" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="medium"
                      >
                        <PreviewIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </TableCell> */}
                </TableRow>
              ) : null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={nfts.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default RecentNFTsTable;
// Modified @arbab

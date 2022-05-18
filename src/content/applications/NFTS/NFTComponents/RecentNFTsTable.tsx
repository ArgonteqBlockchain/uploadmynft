import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import {
  Divider,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  CardHeader,
} from '@mui/material';

import { useLocation } from 'react-router';
import { INFT } from 'src/models/nft';
import { Collection } from 'src/models/collection';
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
  const [nfts, setNfts] = useState([]);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const location = useLocation();
  const collection: Collection = location.state as any;

  useEffect(() => {
    axios({
      method: 'get',
      url: `${collection.baseurl}tokens`,
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

  return (
    <Card>
      <CardHeader title="NFTS" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Media</TableCell>
              <TableCell>Details</TableCell>
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
                  <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <a href={nft.meta.image} target="_blank" rel="noreferrer">
                      <div
                        style={{
                          minHeight: '140px',
                          maxHeight: '160px',
                          width: '200px',
                          marginLeft: '10px',
                          marginTop: 10,
                          backgroundImage: `url(${nft.meta.image})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    </a>

                    {nft.meta.animation_url && (
                      <div
                        style={{
                          minHeight: '140px',
                          maxHeight: '160px',
                          width: '200px',
                          marginTop: 10,
                          marginLeft: 10,
                          backgroundImage: `url(${nft.meta.animation_url})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    )}
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

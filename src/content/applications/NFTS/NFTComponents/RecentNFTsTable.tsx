import React, { FC, ChangeEvent, useState, useEffect, Suspense } from 'react';
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
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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

const Model = ({ objectLink }) => {
  const gltf = useLoader(GLTFLoader, objectLink);
  return (
    <>
      <primitive object={gltf.scene} scale={50} />
    </>
  );
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
                    align="center"
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
                      {console.log(nft.meta.image)}
                    </a>

                    {!!nft.meta.animation_url && nft.meta.animation_url.length > 0 && (
                      <Canvas>
                        <Suspense fallback={null}>
                          <Model objectLink={nft.meta.animation_url} />
                          <OrbitControls
                            addEventListener={undefined}
                            hasEventListener={undefined}
                            removeEventListener={undefined}
                            dispatchEvent={undefined}
                          />
                          <Environment preset="sunset" />
                        </Suspense>
                      </Canvas>
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

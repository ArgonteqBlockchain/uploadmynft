import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
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

import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from 'react-router-dom';
import { Collection } from 'src/models/collection';

interface RecentCollectionsTableProps {
  className?: string;
  collections: Collection[];
}

const applyPagination = (collections: Collection[], page: number, limit: number): Collection[] => {
  return collections.slice(page * limit, page * limit + limit);
};

const RecentCollectionsTable: FC<RecentCollectionsTableProps> = ({ collections }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const paginatedCollections = applyPagination(collections, page, limit);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleManageNFT = (collection: Collection): void => {
    navigate('/content/nfts', { state: collection });
  };

  return (
    <Card>
      <CardHeader title="Collections" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right" id="manageNFT">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCollections.map((collection) => {
              return (
                <TableRow hover key={collection.address}>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {collection.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {collection.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {collection.address}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Manage NFT" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          handleManageNFT(collection);
                        }}
                      >
                        <ViewListIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={collections.length}
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

RecentCollectionsTable.propTypes = {
  collections: PropTypes.array.isRequired,
};

RecentCollectionsTable.defaultProps = {
  collections: [],
};

export default RecentCollectionsTable;
// Modified @arbab

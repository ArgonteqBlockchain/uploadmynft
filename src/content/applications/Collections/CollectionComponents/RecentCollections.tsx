import React from 'react';
import { Card } from '@mui/material';
import RecentCollectionsTable from './RecentCollectionsTable';
import { useCollections } from 'src/hooks/useCollections';

function RecentCollections() {
  const { collections } = useCollections({});

  return (
    <Card>
      <RecentCollectionsTable collections={collections} />
    </Card>
  );
}

export default RecentCollections;

// Modified

import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentTransactionsTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      State: 'completed',
      Policy: subDays(new Date(), 1).toLocaleDateString(),
      Supply: 1,
      Tokenprefix: 'MKT',
      Count: '3',
      Sold: '0',
      Reserved: 0,
      Free: 3,
    },
    {
      id: '2',
      State: 'completed',
      Policy: subDays(new Date(), 1).toLocaleDateString(),
      Supply: 1,
      Tokenprefix: 'MKT',
      Count: '3',
      Sold: '0',
      Reserved: 0,
      Free: 3,
    },
    {
      id: '3',
      State: 'completed',
      Policy: subDays(new Date(), 1).toLocaleDateString(),
      Supply: 1,
      Tokenprefix: 'MKT',
      Count: '3',
      Sold: '0',
      Reserved: 0,
      Free: 3,
    },
    {
      id: '4',
      State: 'completed',
      Policy: subDays(new Date(), 1).toLocaleDateString(),
      Supply: 1,
      Tokenprefix: 'MKT',
      Count: '3',
      Sold: '0',
      Reserved: 0,
      Free: 3,
    },
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;

// Modified

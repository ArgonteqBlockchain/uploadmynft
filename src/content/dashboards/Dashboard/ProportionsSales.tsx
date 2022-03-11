import {
  Card,
  Box,
  CardContent,
  CardHeader,
  Typography,
  // Avatar,
  // LinearProgress
} from '@mui/material';

import { styled } from '@mui/material/styles';
// import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
// import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';

const Project = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: #fec62d;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`,
);

const Mintingcosts = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: #517ddb;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`,
);

const Fees = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: #ea3943;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`,
);

const MinUtxo = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: green;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`,
);

function ProportionsSales() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Proportions Sales" />
      <CardContent sx={{ pt: 2 }}>
        <Box display="flex" alignItems="center" pl={1} pb={3}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Project />
            Project
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Mintingcosts />
            Mintingcosts
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Fees />
            Fees
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <MinUtxo />
            MinUtxo
          </Typography>
        </Box>
        <Box height={200}>{/* <TasksAnalyticsChartWrapper data={transactions} labels={generic.month.labels} /> */}</Box>
      </CardContent>
    </Card>
  );
}

export default ProportionsSales;

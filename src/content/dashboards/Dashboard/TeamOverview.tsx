import {
  Card,
  Box,
  Grid,
  Typography,
  // Avatar,
  // CardHeader,
  // Badge,
  // Tooltip,
  // useTheme,
  // LinearProgress,
} from '@mui/material';

// import { styled } from '@mui/material/styles';
// import { formatDistance, subDays, subMinutes, subHours } from 'date-fns';
// import Text from 'src/components/Text';

// const DotLegend = styled('span')(
//   ({ theme }) => `
//     border-radius: 22px;
//     width: ${theme.spacing(1.5)};
//     height: ${theme.spacing(1.5)};
//     display: inline-block;
//     margin-right: ${theme.spacing(0.5)};
//     border: ${theme.colors.alpha.white[100]} solid 2px;
// `,
// );

// const AvatarWrapper = styled(Avatar)(
//   ({ theme }) => `
//     width: ${theme.spacing(7)};
//     height: ${theme.spacing(7)};
// `,
// );

// const LinearProgressWrapper = styled(LinearProgress)(
//   ({ theme }) => `
//         flex-grow: 1;
//         height: 10px;

//         &.MuiLinearProgress-root {
//           background-color: ${theme.colors.alpha.black[10]};
//         }

//         .MuiLinearProgress-bar {
//           border-radius: ${theme.general.borderRadiusXl};
//         }
// `,
// );

function TeamOverview() {
  // const theme = useTheme();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box display="flex" alignItems="center" pb={3}>
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="h4" noWrap gutterBottom>
                  Total Income (ADA)
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  0
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
                  Last 24h (ADA)
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  0
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
                  Total Sales
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  0
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box display="flex" alignItems="center" pb={3}>
              <Box sx={{ ml: 1.5 }}>
                {/* <i className="fa fa-calculator" style={font-size: "24px"}></i> */}
                <Typography variant="h4" noWrap gutterBottom>
                  Last 24h
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  0
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default TeamOverview;

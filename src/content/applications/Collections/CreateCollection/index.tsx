import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button, Tooltip, InputLabel } from '@mui/material';
import Joyride, { CallBackProps, STATUS, StoreHelpers } from 'react-joyride';
import generateHash from '../../../../utils/generateHash';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useWeb3React } from '@web3-react/core';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createCollectionSteps } from 'src/constants/steps';
import { useCallWithGasPrice } from 'src/hooks/useCallWithGasPrice';
import { useFactoryContract } from 'src/hooks/useContracts';
import useLocalStorage from 'src/hooks/useLocalStorage';

function CreateCollection() {
  const { getItem, setItem } = useLocalStorage('showOnCollection', { show: false, onCollectionCreate: false }, true);
  const navigate = useNavigate();
  let helpers: StoreHelpers;

  const titleString =
    'Once you submit the form, you will need to confirm transaction on your MetaMask wallet. After confirmation and successfull transaction, you will be able to view your transaction hash in a popup.';

  const [tour, setTour] = useState({
    run: getItem('show', false),
    steps: createCollectionSteps,
  });

  const [query, setquery] = useState('free');
  const { account, active, error } = useWeb3React();
  const contract = useFactoryContract();
  const { callWithGasPrice } = useCallWithGasPrice();
  const [status, setstatus] = useState(false);
  const [hash, sethash] = useState('success');
  const [name, setname] = useState();
  const [symbol, setsymbol] = useState();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/content/collections', { replace: true });
  };

  function onNameChange(e) {
    setname(e.target.value);
    setstatus(true);
  }

  function onSymbolChange(e) {
    setsymbol(e.target.value);
    setstatus(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setquery('progress');
    console.log(name, symbol);
    if (active && !error) {
      const baseURL = generateHash(name, symbol, account);
      const serverAddr = process.env.REACT_APP_API;
      const uri = serverAddr + '/' + baseURL + '/';
      console.log(baseURL);
      //  calling contract
      const tx = await callWithGasPrice(contract, 'createNewCollection', [name, symbol, uri]);
      const result = await tx.wait();
      sethash(result.transactionHash);
      setquery('success');
      setItem('onCollectionCreate', true);
      console.log('Crete collection clincked');
      setstatus(false);
    }
  }

  const unloadPage = () => {
    if (status) {
      return 'You have unsaved changes on this page.';
    }
  };

  const getHelpers = (_helpers: StoreHelpers) => {
    helpers = _helpers;
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setTour({
        ...tour,
        run: false,
      });
    }
  };

  window.onbeforeunload = unloadPage;
  return (
    <>
      <Helmet>
        <title>Upload Collection</title>
      </Helmet>
      <Joyride
        callback={handleJoyrideCallback}
        continuous={true}
        getHelpers={getHelpers}
        run={tour.run}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        steps={tour.steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <Container maxWidth="sm">
        <Grid
          container
          spacing={3}
          sx={{
            marginTop: 'auto',
          }}
        >
          <Grid item xs={12}>
            <Card
              sx={{
                textAlign: 'center',
              }}
            >
              <CardHeader title="Add Collection" />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                  >
                    <div
                      style={{
                        width: 'fit-content',
                        margin: '0 auto',
                      }}
                    >
                      <div
                        id="collection-name"
                        style={{
                          textAlign: 'left',
                          marginLeft: '10px',
                        }}
                      >
                        <InputLabel
                          htmlFor="name"
                          color="primary"
                          focused
                          margin="dense"
                          required
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                          Collection Name
                        </InputLabel>
                      </div>
                      <TextField
                        required
                        id="outlined-required"
                        placeholder="e.g. MyCollection"
                        onChange={onNameChange}
                      />
                    </div>
                    <div
                      id="collection-symbol"
                      style={{
                        width: 'fit-content',
                        margin: '0 auto',
                      }}
                    >
                      <div
                        style={{
                          textAlign: 'left',
                          marginLeft: '10px',
                        }}
                      >
                        <InputLabel
                          htmlFor="name"
                          color="primary"
                          focused
                          margin="dense"
                          required
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                          Collection Symbol
                        </InputLabel>
                      </div>
                      <TextField required id="outlined-required" placeholder="e.g. MYC" onChange={onSymbolChange} />
                    </div>
                    <Grid container justifyContent="center">
                      {query === 'progress' ? (
                        <Button disabled sx={{ margin: 1 }} variant="contained">
                          Submit
                        </Button>
                      ) : (
                        <Button id="submitCollection" type="submit" sx={{ margin: 1 }} variant="contained">
                          Submit
                        </Button>
                      )}
                      {query === 'progress' ? (
                        <Fade
                          in={query === 'progress'}
                          style={{
                            transitionDelay: query === 'progress' ? '800ms' : '0ms',
                          }}
                          unmountOnExit
                        >
                          <CircularProgress />
                        </Fade>
                      ) : null}
                      {query === 'success' ? (
                        <>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{'Transaction Hash'}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">{hash}</DialogContentText>
                            </DialogContent>
                          </Dialog>
                        </>
                      ) : null}
                      <Tooltip
                        title={titleString}
                        arrow
                        sx={{
                          marginTop: '15px',
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </Tooltip>
                    </Grid>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default CreateCollection;

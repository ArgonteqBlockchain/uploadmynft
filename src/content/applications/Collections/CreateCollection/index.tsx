import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Tooltip,
  TextField,
  InputLabel,
} from '@mui/material';
import Joyride, { CallBackProps, STATUS, StoreHelpers } from 'react-joyride';
import generateHash from '../../../../utils/generateHash';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
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
  const { getItem, setItem } = useLocalStorage('showOnCollection', { show: true, onCollectionCreate: false }, true);
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
  const [royalty, setRoyalty] = useState(0);
  const [description, setdescription] = useState('');
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/content/collections', { replace: true });
  };

  function onRoyaltyChange(e: any) {
    setRoyalty(e.target.value * 100);
    setstatus(true);
  }

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
    // console.log(name, symbol);
    if (active && !error) {
      const baseURL = generateHash(name, symbol, account);
      const serverAddr = process.env.REACT_APP_API;
      const uri = 'https://' + serverAddr + '/' + baseURL + '/';
      // console.log(baseURL);
      //  calling contract
      const tx = await callWithGasPrice(contract, 'createNewCollection', [name, symbol, uri]);
      const result = await tx.wait();
      sethash(result.transactionHash);
      setquery('success');
      setItem('onCollectionCreate', true);
      // console.log('Crete collection clincked');
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
            <Card>
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
                    <div>
                      <TextField
                        style={{ width: '94%' }}
                        required
                        id="outlined-required"
                        placeholder="e.g. MyCollection"
                        onChange={onNameChange}
                      />
                    </div>
                    <div
                      id="collection-symbol"
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
                    <div>
                      <TextField
                        style={{ width: '94%' }}
                        id="outlined-required"
                        placeholder="e.g. MYC"
                        onChange={onSymbolChange}
                      />
                    </div>
                    <div
                      id="collection-description"
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
                        Collection Description
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        style={{ width: '94%' }}
                        required
                        multiline
                        id="outlined-required"
                        placeholder="Description"
                        onChange={onNameChange}
                      />
                    </div>
                    <div
                      id="collection-royalty"
                      style={{
                        textAlign: 'left',
                        marginLeft: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <InputLabel
                        htmlFor="royalty"
                        color="primary"
                        focused
                        required
                        margin="dense"
                        sx={{
                          fontWeight: 'bold',
                        }}
                      >
                        Add Royalty
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        style={{ width: '94%' }}
                        id="outlined-textarea"
                        type="number"
                        placeholder="e.g. 2.5"
                        InputProps={{
                          inputProps: {
                            max: 8,
                            min: 0,
                            step: 0.1,
                          },
                        }}
                        onChange={onRoyaltyChange}
                      />
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

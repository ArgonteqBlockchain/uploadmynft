import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, Options } from 'ipfs-http-client';
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
  Typography,
} from '@mui/material';
import Joyride, { CallBackProps, STATUS, StoreHelpers } from 'react-joyride';
import generateHash from '../../../../utils/generateHash';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import { useWeb3React } from '@web3-react/core';
import Fade from '@mui/material/Fade';
import { BigNumber } from 'ethers';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createCollectionSteps } from 'src/constants/steps';
import { useCallWithGasPrice } from 'src/hooks/useCallWithGasPrice';
import { useFactoryContract } from 'src/hooks/useContracts';
import useLocalStorage from 'src/hooks/useLocalStorage';
import axios from 'axios';

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

  const [query, setQuery] = useState('free');
  const { account, active, error } = useWeb3React();
  const contract = useFactoryContract();
  const { callWithGasPrice } = useCallWithGasPrice();
  const [status, setStatus] = useState(false);
  const [hash, setHash] = useState('success');
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [royalty, setRoyalty] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(true);

  const myOption: Options = {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    url: 'https://ipfs.infura.io:5001',
  };

  const ipfs = create(myOption);

  const handleClose = () => {
    setOpen(false);
    navigate('/content/collections', { replace: true });
  };

  function onRoyaltyChange(e: any) {
    setRoyalty(e.target.value);
    setStatus(true);
  }

  function onDescriptionChange(e) {
    setDescription(e.target.value);
    setStatus(true);
  }

  function onNameChange(e) {
    setName(e.target.value);
    setStatus(true);
  }

  function onSymbolChange(e) {
    setSymbol(e.target.value);
    setStatus(true);
  }

  function onUploadChange(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
    setStatus(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setQuery('progress');
    // console.log(name, symbol);
    if (active && !error) {
      const baseURL = generateHash(name, symbol, account);
      const serverAddr = process.env.REACT_APP_API;
      const uri = 'https://' + serverAddr + '/' + baseURL + '/';

      const uploadImage = await ipfs.add(image);
      const imageLink = 'https://ipfs.io/ipfs/' + uploadImage.path;
      console.log(imageLink);
      try {
        const tx = await callWithGasPrice(contract, 'createNewCollection', [name, symbol, uri, royalty * 100]);
        const result = await tx.wait();
        console.log('RESULT', result);
        setHash(result.transactionHash);
        setQuery('success');
        setItem('onCollectionCreate', true);
        setStatus(false);

        console.log('IPFS', ipfs);

        axios({
          method: 'POST',
          url: `https://${process.env.REACT_APP_API}/baseurl_contract`,
          data: {
            baseurl: baseURL,
            meta: {
              address: result.contractAddress,
              name: name,
              symbol: symbol,
              description: description,
              image: imageLink,
              seller_fee_basis_points: royalty * 100 + 200,
              fee_recipient: result.contractAddress,
            },
          },
        })
          .then(function (response) {
            console.log('Done');
          })
          .catch(function (error) {
            console.log('Unable to post', error);
          });
      } catch (error) {
        setHash(error.message);
        setQuery('success');
        console.log(error.message);
      }
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
      <Container
        maxWidth="sm"
        sx={{
          marginBottom: '10px',
        }}
      >
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
                        onChange={onDescriptionChange}
                      />
                    </div>
                    <div
                      id="media"
                      style={{
                        textAlign: 'left',
                        marginLeft: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <InputLabel
                        htmlFor="name"
                        color="primary"
                        focused
                        required
                        margin="dense"
                        sx={{
                          fontWeight: 'bold',
                        }}
                      >
                        Media
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        required
                        style={{ width: '94%' }}
                        type="file"
                        id="outlined-required"
                        label="Image/GIF"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          accept: 'image/*',
                        }}
                        onChange={(event) => onUploadChange(event)}
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
                        Add Royalty (0-8)
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
                <Typography
                  sx={{
                    marginTop: '-10px',
                  }}
                  variant="subtitle2"
                >
                  Note:
                  <ul>
                    <li>
                      This collection will be listed on OpenSea where it will automatically deduct 2.5% royalty on sale.
                    </li>
                    <li>
                      Upload My NFT adds its own 2% royalty along with the royalty that you add here. For example, if
                      you add 0 royalty, the total royalty will be 2% (0% user royalty + 2% Upload My NFT)
                    </li>
                  </ul>
                </Typography>
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

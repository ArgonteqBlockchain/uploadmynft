import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// import { create, Options } from 'ipfs-http-client';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button, Tooltip } from '@mui/material';
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

import { useCallWithGasPrice } from 'src/hooks/useCallWithGasPrice';
import { useFactoryContract } from 'src/hooks/useContracts';

function CreateCollection() {
  const titleString =
    'Once you submit the form, you will need to confirm transaction on your MetaMask wallet. After confirmation and successfull transaction, you will be able to view your transaction hash in a popup.';

  const [query, setquery] = useState('free');
  const { account, active, error } = useWeb3React();
  const contract = useFactoryContract();
  const { callWithGasPrice } = useCallWithGasPrice();
  const [status, setstatus] = useState(false);
  const [hash, sethash] = useState('success');
  const [name, setname] = useState();
  // const [description, setdescription] = useState();
  const [symbol, setsymbol] = useState();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  // const [image, setimage] = useState();

  // const myOption: Options = {
  //   host: 'ipfs.infura.io',
  //   port: 5001,
  //   protocol: 'https',
  //   apiPath: '/api/v0',
  //   url: 'https://ipfs.infura.io:5001',
  // };
  // const ipfs = create(myOption);

  function onNameChange(e) {
    setname(e.target.value);
    setstatus(true);
  }

  // function onDescriptionChange(e) {
  //   setdescription(e.target.value);
  // }

  function onSymbolChange(e) {
    setsymbol(e.target.value);
    setstatus(true);
  }

  // function onImageChange(e) {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setimage(e.target.files[0]);
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    setquery('progress');
    // const UploadImage = await ipfs.add(image);
    // let linked = 'https://ipfs.infura.io/ipfs/' + UploadImage.path;
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
      setstatus(false);
    }
  }
  const unloadPage = () => {
    if (status) {
      return 'You have unsaved changes on this page.';
    }
  };

  window.onbeforeunload = unloadPage;
  return (
    <>
      <Helmet>
        <title>Upload Collection</title>
      </Helmet>

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
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Name"
                      placeholder="Name"
                      onChange={onNameChange}
                    />
                  </div>
                  {/* <div>
                    <TextField
                      required
                      id="outlined-textarea"
                      label="Description"
                      placeholder="Description"
                      multiline
                      onChange={onDescriptionChange}
                    />
                  </div> */}
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Symbol"
                      placeholder="Symbol"
                      onChange={onSymbolChange}
                    />
                  </div>
                  {/* <div>
                    <TextField
                      required
                      type="file"
                      id="outlined-required"
                      label="Media"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onImageChange}
                    />
                  </div> */}
                  <Grid container justifyContent="center">
                    {query === 'progress' ? (
                      <Button disabled sx={{ margin: 1 }} variant="contained" onClick={handleSubmit}>
                        Submit
                      </Button>
                    ) : (
                      <Button sx={{ margin: 1 }} variant="contained" onClick={handleSubmit}>
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

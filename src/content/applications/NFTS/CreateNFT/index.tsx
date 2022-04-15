import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { create, Options } from 'ipfs-http-client';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NFTView from './components/NFTView';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useWeb3React } from '@web3-react/core';
import { useLocation } from 'react-router';
import { Collection } from 'src/models/collection';
import { useCollectionContract } from 'src/hooks/useContracts';
import { useCallWithGasPrice } from 'src/hooks/useCallWithGasPrice';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function CreateNFT() {
  const location = useLocation();

  // let navigate = useNavigate();
  if (!location || !!location.state || location.state == null || location.state == undefined) {
    console.log('State not defined');
    console.log(location);
    // navigate('/content/collections');
  }

  const { account } = useWeb3React();
  const [query, setQuery] = useState('free');
  const [hash, setHash] = useState('success');
  const [name, setName] = useState('');
  const [description, setdescription] = useState('');
  const [image, setImage] = useState(null);
  const [object, setObject] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [useraddress, setuseraddress] = useState(account);
  const [status, setstatus] = useState(false);
  const [open, setOpen] = useState(true);
  const collection: Collection = location.state['state'] as any;
  const collectionContract = useCollectionContract(collection.address);
  const { callWithGasPrice } = useCallWithGasPrice();

  enum UploadType {
    Image,
    Object,
  }

  const myOption: Options = {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    url: 'https://ipfs.infura.io:5001',
  };

  const ipfs = create(myOption);

  const hashHandleClose = () => {
    setOpen(false);
  };

  if (collection == null) {
    console.log('Collection is null');
  }

  function onAddressChange(e: any) {
    setuseraddress(e.target.value);
  }

  function onNameChange(e: any) {
    setName(e.target.value);
    setstatus(true);
  }

  function onDescriptionChange(e: any) {
    setdescription(e.target.value);
    setstatus(true);
  }

  function onUploadChange(e: any, type: UploadType) {
    if (e.target.files && e.target.files.length > 0) {
      if (type === UploadType.Image) setImage(e.target.files[0]);
      else if (type === UploadType.Object) setObject(e.target.files[0]);
    }
    setstatus(true);
  }

  async function postIPFS(
    result: TransactionReceipt & {
      events: Record<string, any>[];
    },
    ipfs: string,
  ) {
    if (
      !!result &&
      !!result.events &&
      result.events.length > 0 &&
      !!result.events[0].event &&
      result.events[0].event === 'Transfer'
    ) {
      const tokenId = BigNumber.from(result.events[0].topics[result.events[0].topics.length - 1]).toNumber();
      console.log(tokenId);
      console.log('IPFS', ipfs);
      axios({
        method: 'POST',
        url: `https://${process.env.REACT_APP_API}/baseurl`,
        data: {
          baseurl: collection.baseurl,
          tokenId: tokenId,
          tokenURI: ipfs,
        },
      })
        .then(function (response) {
          console.log('Done');
        })
        .catch(function (error) {
          console.log('Unable to post', error);
        });
    }
  }

  async function mint(link: string) {
    const localAccount = account;
    console.log(localAccount);
    console.log(collectionContract.address);
    const tx = await callWithGasPrice(collectionContract, 'safeMint', [localAccount]);
    console.log(tx);
    const result = await tx.wait();
    console.log(result);
    postIPFS(result as any, link);
    return result.transactionHash;
  }

  async function mintTo(receiverAddress: string, link: string) {
    const tx = await callWithGasPrice(collectionContract, 'safeMint', [receiverAddress]);
    console.log(tx);
    const result = await tx.wait();
    console.log(result);
    postIPFS(result as any, link);
    return result.transactionHash;
  }

  async function handleSubmitMint(e: any) {
    e.preventDefault();
    setQuery('progress');
    const uploadImage = await ipfs.add(image);
    let uploadObject = null;
    let imageLink = 'https://ipfs.io/ipfs/' + uploadImage.path;

    const obj = {
      name: name,
      description: description,
      image: imageLink,
      attributes: attributes,
    };

    if (object != null) {
      uploadObject = await ipfs.add(object);
      obj['animation_url'] = 'https://ipfs.io/ipfs/' + uploadObject.path;
    }

    const data = JSON.stringify(obj);
    const UploadData = await ipfs.add(data);
    let linkedData = 'https://ipfs.io/ipfs/' + UploadData.path;
    const has = await mint(linkedData);
    setHash(has);
    setQuery('success');
  }

  async function handleSubmitMintTo(e: any) {
    e.preventDefault();
    setQuery('progress');
    const UploadImage = await ipfs.add(image);
    let linked = 'https://ipfs.io/ipfs/' + UploadImage.path;
    const obj = {
      name: name,
      description: description,
      image: linked,
      attributes: attributes,
    };
    const data = JSON.stringify(obj);
    const UploadData = await ipfs.add(data);
    let linkedData = 'https://ipfs.io/ipfs/' + UploadData.path;

    const has = await mintTo(useraddress, linkedData);
    setHash(has);
    setQuery('success');
    setstatus(false);
    setIsOpen(false);
  }

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const unloadPage = () => {
    if (status) {
      return 'You have unsaved changes on this page.';
    }
  };

  window.onbeforeunload = unloadPage;

  return (
    <>
      <Helmet>
        <title>Upload NFT</title>
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
            <Card>
              <CardHeader title={`Add NFT for "${collection.name}"`} />
              <Divider />
              <CardContent>
                <form>
                  <Box
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                  >
                    <div
                      id="name"
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
                        NFT Name
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        style={{ width: '94%' }}
                        required
                        id="outlined-required"
                        placeholder="Name"
                        onChange={onNameChange}
                      />
                    </div>

                    <div
                      id="description"
                      style={{
                        textAlign: 'left',
                        marginLeft: '10px',
                      }}
                    >
                      <InputLabel
                        htmlFor="description"
                        color="primary"
                        focused
                        margin="dense"
                        sx={{
                          fontWeight: 'bold',
                        }}
                      >
                        NFT Description
                      </InputLabel>
                    </div>
                    <div>
                      <TextField
                        style={{ width: '94%' }}
                        id="outlined-textarea"
                        placeholder="Description"
                        multiline
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
                        onChange={(event) => onUploadChange(event, UploadType.Image)}
                      />
                      <TextField
                        style={{ width: '94%' }}
                        type="file"
                        id="outlined-required"
                        label="3D"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          accept: '.gltf, .glb',
                        }}
                        onChange={(event) => onUploadChange(event, UploadType.Object)}
                      />
                    </div>
                    <div>
                      <NFTView attributes={attributes} setAttributes={setAttributes as any} />
                    </div>
                    <div
                      style={{
                        marginLeft: '40%',
                      }}
                    >
                      {query == 'progress' ? (
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
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      {query == 'progress' ? (
                        <Button disabled sx={{ margin: 2 }} variant="contained">
                          Mint
                        </Button>
                      ) : (
                        <Button
                          sx={{ margin: 2 }}
                          variant="contained"
                          disabled={name.length <= 0 && image == null ? true : false}
                          onClick={handleSubmitMint}
                        >
                          Mint
                        </Button>
                      )}
                      {query == 'progress' ? (
                        <Button disabled sx={{ margin: 2 }} variant="contained">
                          Mint To
                        </Button>
                      ) : (
                        <Button
                          sx={{ margin: 2 }}
                          disabled={name.length <= 0 && image == null ? true : false}
                          variant="contained"
                          type="submit"
                          onClick={handleClickOpen}
                        >
                          Mint To
                        </Button>
                      )}

                      {query === 'success' ? (
                        <Dialog
                          open={open}
                          onClose={hashHandleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">{'Transaction Successful'}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">{hash}</DialogContentText>
                          </DialogContent>
                        </Dialog>
                      ) : null}
                      <Dialog open={isOpen} onClose={handleClose}>
                        <DialogTitle>Mint To</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Please enter wallet address of the user you want to mint this NFT to.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Address"
                            type="string"
                            fullWidth
                            variant="standard"
                            onChange={onAddressChange}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleSubmitMintTo}>Mint</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
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

export default CreateNFT;

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { create, Options } from 'ipfs-http-client';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button } from '@mui/material';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Forms() {
  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const [symbol, setsymbol] = useState();
  const [image, setimage] = useState();
  const myOption: Options = {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    url: 'https://ipfs.infura.io:5001',
  };
  const ipfs = create(myOption);

  function onNameChange(e) {
    setname(e.target.value);
  }
  function onDescriptionChange(e) {
    setdescription(e.target.value);
  }
  function onSymbolChange(e) {
    setsymbol(e.target.value);
  }
  function onImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setimage(e.target.files[0]);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const UploadImage = await ipfs.add(image);
    let linked = 'https://ipfs.infura.io/ipfs/' + UploadImage.path;
    console.log(name, description, symbol, linked);
  }
  return (
    <>
      <Helmet>
        <title>Upload Collection</title>
      </Helmet>

      <Container maxWidth="sm" style={{ marginTop: 'auto' }}>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
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
                  <div>
                    <TextField
                      required
                      id="outlined-textarea"
                      label="Description"
                      placeholder="Description"
                      multiline
                      onChange={onDescriptionChange}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Symbol"
                      placeholder="Symbol"
                      onChange={onSymbolChange}
                    />
                  </div>
                  <div>
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
                  </div>
                  <div>
                    <Button sx={{ margin: 1 }} variant="contained" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
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

export default Forms;

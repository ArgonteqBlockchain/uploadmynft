import React, { useState } from 'react';
import { Tooltip, IconButton, useTheme, TextField } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const NFTList = (props: any) => {
  const theme = useTheme();
  const [Trait, settrait] = useState('');
  const [Value, setvalue] = useState('');
  function onTraitChange(e) {
    settrait(e.target.value);
  }
  function onValueChange(e) {
    setvalue(e.target.value);
  }

  return props.nftDetails.map((val, idx) => {
    let trait_type = `trait-${idx}`,
      value = `value-${idx}`;
    props.nftDetails[props.current].trait_type = Trait;
    props.nftDetails[props.current].value = Value;

    return (
      <div className="form-row" key={trait_type}>
        <div>
          <TextField
            id={trait_type}
            inputProps={{
              'data-id': { idx },
            }}
            label="Trait"
            placeholder="Trait"
            onChange={onTraitChange}
          />
          <TextField
            id={value}
            inputProps={{
              'data-id': { idx },
            }}
            label="Value"
            placeholder="Value"
            onChange={onValueChange}
          />
          {/* {props.disp ? (
            (
              <Tooltip title="Add field" arrow>
                <IconButton
                  sx={{
                    marginTop: '12px',
                    '&:hover': {
                      background: theme.colors.primary.lighter,
                    },
                    color: theme.palette.primary.main,
                  }}
                  color="inherit"
                  size="medium"
                  onClick={() => props.add()}
                >
                  <AddCircleOutlineIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            ) : */}
          <Tooltip title="Remove field" arrow>
            <IconButton
              sx={{
                marginTop: '12px',
                '&:hover': {
                  background: theme.colors.primary.lighter,
                },
                color: theme.palette.primary.main,
              }}
              color="inherit"
              size="medium"
              onClick={() => props.delete(val)}
            >
              <RemoveCircleOutlineIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          {/* ) : null} */}
        </div>
      </div>
    );
  });
};
export default NFTList;

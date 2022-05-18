import React from 'react';
import { styled } from '@mui/material/styles';

const P = styled('p')({
  marginBottom: 'none',
});

function UserDetails() {
  return (
    <>
      <P>Asfqwasdf dfaf</P>
      <P>Customer-Id: 207569</P>
      <P>0.00 ADA</P>
      <P>Price level: Tier D</P>
    </>
  );
}

export default UserDetails;

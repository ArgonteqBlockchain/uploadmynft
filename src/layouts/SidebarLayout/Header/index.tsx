import { useContext } from 'react';

import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

// import HeaderMenu from './Menu';
// import HeaderButtons from './Buttons';
// import HeaderUserbox from './Userbox';
import ConnectWalletButton from 'src/components/ConnectWalletButton';
// import Logo from 'src/components/Logo';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`,
);

// const LogoText = styled(Box)(
//   ({ theme }) => `
//         display:none;
//         font-size: ${theme.typography.pxToRem(20)};
//         font-weight: ${theme.typography.fontWeightBold};
//         @media (max-width: 760px) {
//             display:block;
//         }
// `,
// );

const LogoText = styled(Box)(
  ({ theme }) => `
  display:block;
        @media (max-width: 760px) {
          left: ${theme.sidebar.width};
          width: auto;
        }
`,
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Hidden lgUp>
          <a
            href="/"
            style={{
              textDecoration: 'none',
              fontWeight: '800',
              fontSize: '20px',
              color: '#dfe2e3',
            }}
          >
            Upload My NFT
          </a>
        </Hidden>
      </Box>
      <Box display="flex">
        {/* <HeaderButtons /> */}
        <LogoText>
          {' '}
          <ConnectWalletButton />{' '}
        </LogoText>
        <Hidden lgUp>
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Hidden>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;

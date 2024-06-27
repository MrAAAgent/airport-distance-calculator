
import React from 'react';
import styled from '@emotion/styled'
import { FlightTakeoff } from '@mui/icons-material';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavbarContainer = styled(AppBar)`
  justify-content: center;
  align-items: center;
  background-color: #00AEEF;
  color: white;
  z-index: 1000;
  height: 48px;
`;

const LogoTitleToolbar = styled(Toolbar)`
  display: flex;
  flexDirection: horizontal;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;
  @media (max-width: 475px) {
    display: none; /* Hide Typography when window width is 475px or less */
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <LogoTitleToolbar>
        <FlightTakeoff sx={{marginRight: '8px'}} />
        <StyledTypography>Airport Distance Calculator</StyledTypography>
      </LogoTitleToolbar>
    </NavbarContainer>
  );
};

export default Navbar;
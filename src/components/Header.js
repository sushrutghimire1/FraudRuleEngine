// src/components/Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1976d2;
  color: white;
  padding: 16px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>BillMatrix Rule Engine</h1>
    </HeaderContainer>
  );
};

export default Header;

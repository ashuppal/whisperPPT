import React from 'react';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  marginTop: 'auto',
  background: '#333333',
  color: '#ffffff',
  padding: '1rem',
});

const FooterText = styled('span')({
  marginRight: '0.5rem',
});

const FooterLink = styled('a')({
  color: '#ffffff',
  textDecoration: 'none',
});

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Created by Ashwini Uppal</FooterText>
      <FooterLink href="https://www.linkedin.com/in/ashwini-uppal/">|  LinkedIn</FooterLink>
    </FooterContainer>
  );
};

export default Footer;

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Dlogo from '../public/Dlogo.svg';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const contactInfo = [
    {
      icon: PhoneIcon,
      label: '027 462 4615',
      href: 'tel:0274624615',
    },
    {
      icon: EmailIcon,
      label: 'digicapitalesince2025@gmail.com',
      href: 'mailto:digicapitalesince2025@gmail.com',
    },
    {
      icon: LocationOnIcon,
      label: '119 Tran Duy Hung, Cau Giay, Hanoi, Vietnam',
      href: 'https://maps.google.com/?q=119+Tran+Duy+Hung,+Cau+Giay,+Hanoi,+Vietnam',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: '#FFFFFF',
        py: { xs: 4, sm: 6, md: 8 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 6 }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          justifyContent="space-between"
        >
          {/* Logo Section */}
          <Grid item xs={12} sm={6} md={3} textAlign={{ xs: 'center', md: 'left' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 2,
              }}
            >
              {/* Logo Placeholder */}
              <Box
                component="img"
                src= {Dlogo}
                alt="D'CAPITALE Logo"
                sx={{
                  height: { xs: 80, sm: 100, md: 140 },
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} sm={6} md={9}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2.5, sm: 3, md: 3 },
              }}
            >
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Link
                    key={index}
                    href={info.href}
                    target={info.label.includes('@') ? '_blank' : '_self'}
                    rel={info.label.includes('@') ? 'noopener noreferrer' : undefined}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: 2, sm: 2.5, md: 3 },
                      textDecoration: 'none',
                      color: '#FFFFFF',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',

                      '&:hover': {
                        color: theme.palette.primary.main,
                        transform: 'translateX(8px)',
                      },
                    }}
                  >
                    {/* Icon Container */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: { xs: 24, sm: 28, md: 32 },
                        minHeight: { xs: 24, sm: 28, md: 32 },
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: { xs: 24, sm: 28, md: 32 },
                          color: 'inherit',
                        }}
                      />
                    </Box>

                    {/* Text Container */}
                    <Typography
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'inherit',
                        wordBreak: 'break-word',
                        maxWidth: '100%',
                      }}
                    >
                      {info.label}
                    </Typography>
                  </Link>
                );
              })}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box
          sx={{
            height: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            my: { xs: 3, sm: 4, md: 6 },
          }}
        />

        {/* Footer Bottom - Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            © 2025 D'CAPITALE. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
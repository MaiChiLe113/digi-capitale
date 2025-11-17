import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Stack>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          color: "white",
          padding: 4,
          backgroundImage: `url("https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/vinhomes%20-d'capitale.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            background: `rgba(0, 0, 0, 0.3)`,
            backdropFilter: "blur(3px)",
          },
          "& > *": {
            position: "relative",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h1" color="primary">
            Welcome to D'Capitale
          </Typography>
          <Typography variant="h2" color="primary.contrastText">
            Where Prime Location Meets Perfect Connection
          </Typography>
          <Button variant="containedPrimary" component={Link} to="/about">
            Find out more
          </Button>
        </Box>
      </Box>

      {/* Service Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: 8,
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h3">Our Services</Typography>
          <Typography variant="body1">
            Discover the range of services we offer to enhance your living
            experience.
          </Typography>
          <Button variant="outlined" component={Link} to="/login">
            Log In to Explore Services
          </Button>
        </Box>

        {/* Resident Dynamic Website Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h3">Resident Dynamic Website</Typography>
          <Typography variant="body1">
            Access your personalized resident portal for exclusive features and
            updates.
          </Typography>
          <Button variant="outlined" component={Link} to="/login">
            Log In to Resident Portal
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}


// ATTRACTIVE INCENTIVE POLICY

// 💥  Only for this month  💥

// 🎁  15% discount for customers who pay early

// 🎁  Free furniture package equivalent to 10% of apartment value

// 🎁  Support loan 65% of apartment value with 0% interest rate in 24 months

// 🎁  8% discount for customers paying on schedule

// 🎁  Customers can come and see the apartment directly

// ⇒  Free 10 years of service fees, if you do not receive service fees, they will be deducted directly from the selling price.

// 🎁  1 bedroom apartment: 70 million discount

// 🎁  2-bedroom apartment: 120 million discount

// 🎁  3-bedroom apartment: discount 170 million

// 🎁  Get a housewarming package worth 150 million, deducted from the value before VAT + maintenance fee

// This is the opportunity to buy D'capitale Tran Duy Hung apartment at the best price. What are you waiting for? Hurry up and buy now, call hotline 0987606780 or leave your information below. 
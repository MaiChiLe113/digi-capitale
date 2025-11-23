import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Chip,
  Card,
  CardMedia,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/StarRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import LocationOnIcon from "@mui/icons-material/LocationOnRounded";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalkRounded";

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
          <Typography variant="h5" color="primary.contrastText">
            Where Prime Location Meets Perfect Connection
          </Typography>
          <Button variant="containedPrimary" component={Link} to="/about">
            Find out more
          </Button>
        </Box>
      </Box>
      {/* D’Capitale Overview & Incentives */}
      <Box sx={{ py: 8, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* LEFT COLUMN: INTRODUCTION & DETAILS */}
            <Grid item xs={12} md={7}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="overline"
                    color="primary"
                    fontWeight={700}
                    letterSpacing={1.5}
                  >
                    The Masterpiece
                  </Typography>
                  <Typography variant="h2" color="secondary.main" gutterBottom>
                    About D'Capitale
                  </Typography>
                  <Box
                    sx={{
                      width: 80,
                      height: 4,
                      bgcolor: "primary.main",
                      borderRadius: 1,
                      mb: 3,
                    }}
                  />
                </Box>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                >
                  D'.Capitale is a prestigious complex of high-end apartments,
                  officetels, and commercial centers located at a prime diamond
                  position – the intersection of <strong>Tran Duy Hung</strong>{" "}
                  and <strong>Hoang Minh Giam</strong>, Cau Giay, Hanoi.
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                >
                  A strategic collaboration between{" "}
                  <strong>Tan Hoang Minh Group</strong> and{" "}
                  <strong>Vingroup</strong>, managed and operated by Vinhomes –
                  Vietnam's leading real estate brand. With 6 towers ranging
                  from 39 to 46 floors, we offer over 3,000 modern units
                  tailored for living, investing, or leasing.
                </Typography>

                {/* Project Details Grid */}
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h5"
                    color="secondary.main"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    Project Highlights
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        label: "Developer",
                        value: "Tan Hoang Minh Group",
                        icon: <BusinessIcon />,
                      },
                      {
                        label: "Operator",
                        value: "Vinhomes (Vingroup)",
                        icon: <StarIcon />,
                      },
                      {
                        label: "Location",
                        value: "Tran Duy Hung, Hanoi",
                        icon: <LocationOnIcon />,
                      },
                      {
                        label: "Scale",
                        value: "6 Towers (39-46 Floors)",
                        icon: <BusinessIcon />,
                      },
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: "background.paper",
                            borderRadius: 1, // Uses theme borderRadius (24px)
                            border: "1px solid",
                            borderColor: "divider",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ color: "primary.main" }}>{item.icon}</Box>
                          <Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              {item.label}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="secondary.main"
                              fontWeight={700}
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </Grid>

            {/* RIGHT COLUMN: INCENTIVES CARD */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0} // Flat style for elegance
                sx={{
                  p: 4,
                  bgcolor: "white",
                  borderRadius: 1, // Bo góc theo theme (24px)
                  border: "1px solid",
                  borderColor: "primary.light",
                  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.05)",
                  height: "100%",
                  width: "100%",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative Circle */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    bgcolor: "primary.light",
                    opacity: 0.2,
                    borderRadius: "50%",
                  }}
                />

                <Stack
                  spacing={2}
                  sx={{ mb: 4, textAlign: "center", alignItems: "center" }}
                >
                  <Typography variant="h4" color="secondary.main">
                    Exclusive Privileges
                  </Typography>
                  <Chip
                    label="💥 Limited Time Offer 💥"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                  />
                </Stack>

                <List disablePadding>
                  {[
                    "15% Discount for early payment",
                    "Free interior package (10% value)",
                    "0% Interest loan for 24 months",
                    "8% Discount for standard payment",
                    "Free 10 years of service fees",
                    "Housewarming gift: 150 Million VND",
                    "Up to 170 Million VND discount/unit",
                  ].map((text, index) => (
                    <ListItem
                      key={index}
                      sx={{ py: 1.5, borderBottom: "1px dashed #E2E8F0" }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          color: "secondary.main",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Don't miss this unprecedented opportunity!
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<PhoneInTalkIcon />}
                    href="tel:0987606780"
                    sx={{ mt: 1, borderRadius: 1 }}
                  >
                    Hotline: 0987 606 780
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- VIDEO SECTION --- */}
      <Box sx={{ py: 8, bgcolor: "secondary.main", color: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                color="primary.light"
                fontWeight={700}
                letterSpacing={2}
              >
                Visual Tour
              </Typography>
              <Typography
                variant="h3"
                color="white"
                gutterBottom
                sx={{ mt: 1 }}
              >
                Experience The Lifestyle
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "primary.contrastText",
                }}
              >
                Discover the perfect blend of modern architecture and green
                living at D'Capitale. A place where every moment is a
                masterpiece.
              </Typography>
              <Button
                variant="outlined"
                color="primary" // This will use the gold color
                size="large"
                component={Link}
                to="/about"
                sx={{
                  color: "primary.main",
                  borderColor: "primary.main",
                  borderRadius: 1,
                }}
              >
                View More Amenities
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 1, // Theme rounded corners (24px)
                  overflow: "hidden",
                  boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.25)",
                }}
              >
                <CardMedia
                  component="iframe"
                  src="https://www.youtube.com/embed/YVZo9yR8edY"
                  title="Vinhomes D'capitale Project Video"
                  sx={{
                    height: 350,
                    border: "none",
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
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
          <Button variant="outlined" component={Link} to="/signin">
            Log In to Explore Services
          </Button>
        </Box>

        {/* Resident Section */}
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
          <Button variant="outlined" component={Link} to="/signin">
            Log In to Resident Portal
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}

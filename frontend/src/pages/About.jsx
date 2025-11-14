import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import theme from "../theme";

export default function About() {
  const members = [
    {
      name: "Tran Minh Hai",
      role: "Role 1",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=200&h=200",
    },
    {
      name: "Le Mai Chi",
      role: "Role 2",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=faces&fit=crop&w=200&h=200",
    },
    {
      name: "Nguyen Nhat Lam",
      role: "Role 3",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=200&h=200",
    },
    {
      name: "Nguyen Duc Nam",
      role: "Role 4",
      img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=faces&fit=crop&w=200&h=200",
    },
    {
      name: "Nguyen Huyen Minh Nhat",
      role: "Role 5",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=200&h=200",
    },
  ];

  return (
    <Container
      sx={{
        textAlign: "center",
        borderRadius: 0.5,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      {/* Our Mission */}
      <Typography variant="h3" gutterBottom color="secondary.main">
        {" "}
        Our Mission{" "}
      </Typography>
      <Typography variant="body1" color="secondary.dark" sx={{ mb: 4 }}>
        Digi Capitale is a project team aiming for the development of the D'
        Capitale residential area.
      </Typography>

      {/* Buttons */}
      <Box sx={{ my: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        {/* Confluence */}
        <Button
          variant="contained"
          href="https://cos20031-nguyenducnam.atlassian.net/wiki/spaces/COS20031/pages/98773/Digi+Capitale+Home+Page"
          color="primary"
        >
          {" "}
          See Our Journey{" "}
        </Button>

        {/* Github */}
        <Button
          variant="contained"
          href="https://github.com/MaiChiLe113/digi-capitale/tree/main/frontend"
          color="primary"
        >
          {" "}
          See Our Production{" "}
        </Button>
      </Box>

      {/* Members */}
      <Typography
        variant="h4"
        gutterBottom
        color="secondary.main"
        sx={{ mb: 2 }}
      >
        Meet Our Team
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {members.map((member, index) => (
          <Grid item xs={12} sm={6} md={2} key={index} sx={{ display: "flex" }}>
            <Card
              sx={{
                width: 280,
                height: 200,
                textAlign: "center",
                boxShadow: 4,
                borderRadius: 2,
                background: "linear-gradient(135deg, #D4A160 0%, #C4924A 100%)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 10,
                },
              }}
            >
              <CardMedia
                component="img"
                image={member.img}
                alt={member.name}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  mx: "auto",
                  mt: 2,
                }}
              />

              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "secondary.light",
                  }}
                >
                  {" "}
                  {member.name}{" "}
                </Typography>

                <Typography variant="subtitle1" color="text.primary">
                  {" "}
                  {member.role}{" "}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Stats Section */}
      <Box
        sx={{
          mt: 8,
          py: 6,
          backgroundColor: "background.default",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "#D6B585", mb: 4 }}>
          About Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h3"
              sx={{ color: "secondary.main", fontWeight: "bold" }}
            >
              30+
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
              Countries worldwide
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "secondary.light",
                textAlign: "left",
                maxWidth: "300px",
                mx: "auto",
              }}
            >
              Digi Capitale is continually expanding its services. We now help
              clients in multiple regions, including Asia and beyond. Our
              mission is to create seamless solutions for residential projects,
              ensuring quality and innovation at every step. With a growing
              network, we aim to set new standards in smart living.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h3"
              sx={{ color: "secondary.main", fontWeight: "bold" }}
            >
              50+
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
              Qualified experts
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "secondary.light",
                textAlign: "left",
                maxWidth: "300px",
                mx: "auto",
              }}
            >
              Our team consists of highly skilled professionals specializing in
              design, development, and project management. Each member brings
              unique expertise, enabling us to tackle complex challenges with
              confidence. Collaboration is at the heart of our approach,
              ensuring that every solution is crafted with precision and care.
              Together, we deliver results that exceed expectations.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              variant="h3"
              sx={{ color: "secondary.main", fontWeight: "bold" }}
            >
              70%
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
              Time saved on projects
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "secondary.light",
                textAlign: "left",
                maxWidth: "300px",
                mx: "auto",
              }}
            >
              By leveraging modern tools and streamlined workflows, we reduce
              project timelines by up to 70%. Our focus on efficiency means
              fewer delays and faster delivery without compromising quality.
              Clients benefit from quicker turnarounds, cost savings, and
              improved overall satisfaction. This commitment to speed and
              excellence sets us apart in the industry.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ bgcolor: "primary.contrastText" }} />
    </Container>
  );
}
